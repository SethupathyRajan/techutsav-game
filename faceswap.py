from flask import Flask, request, jsonify
import cv2
import numpy as np
import base64
import insightface
from insightface.app import FaceAnalysis

app = Flask(__name__)

# Initialize InsightFace
face_app = FaceAnalysis(name='buffalo_l')
face_app.prepare(ctx_id=0, det_size=(640, 640))

swapper = insightface.model_zoo.get_model("/home/sethupathy/.insightface/models/inswapper_128.onnx")

def decode_base64_image(image_data):
    nparr = np.frombuffer(base64.b64decode(image_data.split(',')[1]), np.uint8)
    return cv2.imdecode(nparr, cv2.IMREAD_COLOR)

def encode_image_to_base64(image):
    _, buffer = cv2.imencode('.png', image)
    return "data:image/png;base64," + base64.b64encode(buffer).decode("utf-8")

@app.route('/swap-face', methods=['POST'])
def swap_face():
    try:
        data = request.json
        print(f"User image data: {len(data['user_image'])} characters")
        print(f"Frame image data: {len(data['frame_image'])} characters")
        user_img = decode_base64_image(data['user_image'])
        frame_img = decode_base64_image(data['frame_image'])

        user_faces = face_app.get(user_img)
        frame_faces = face_app.get(frame_img)

        if not user_faces or not frame_faces:
            return jsonify({"error": "No faces detected"}), 400

        user_face = user_faces[0]
        output_image = swapper.get(frame_img, frame_faces[0], user_face, paste_back=True)

        swapped_image_base64 = encode_image_to_base64(output_image)
        return jsonify({"swapped_image": swapped_image_base64})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=5001)
