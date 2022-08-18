# import base64, os, numpy as np, cv2, face_recognition
# from flask import Flask
# from flask_cors import CORS

# app = Flask(__name__)
# CORS(app)

# imagesDirectory = os.path.join(os.getcwd(), 'images')
# imagesFiles = os.listdir(imagesDirectory)

# temp_path="K:\\Coding\\python\\review2\\fake.jpeg"

# def save_img(img_base64):
#     img_binary = base64.b64decode(img_base64)

#     img_jpg=np.frombuffer(img_binary, dtype=np.uint8)

#     img = cv2.imdecode(img_jpg, cv2.IMREAD_COLOR)

#     # DETECTING FACE FOR TEMPORARY CHECK
#     cv2.imwrite(temp_path, img)
#     detect_faces(temp_path, img)

#     # THE REAL FUNCTION FOR COMPARING FACES
#     flag = compare()
    
#     print(flag)
#     if(flag == False):
#         return "Not able to take the attendace"

#     return flag

# def detect_faces_caller():
#     for im_path in imagesFiles:
#         the_real_path = os.path.join(imagesDirectory, im_path)
#         image = cv2.imread(the_real_path)
#         detect_faces(the_real_path, image)

# def detect_faces(path, img):
#     face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
#     gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)  
#     faces = face_cascade.detectMultiScale(gray, 1.1, 4)  
#     for (x, y, w, h) in faces:  
#         cv2.rectangle(img, (x, y), (x + w, y + h), (255, 0, 0), 2)
#     cv2.imwrite(path, img)

# def compare():
#     fake = face_recognition.load_image_file(temp_path)

#     for im_path in imagesFiles:
#         the_real_path = os.path.join(imagesDirectory, im_path)
#         real = face_recognition.load_image_file(the_real_path)

#         biden_encoding = face_recognition.face_encodings(real)[0]
#         unknown_encoding = face_recognition.face_encodings(fake)[0]

#         results = face_recognition.compare_faces([biden_encoding], unknown_encoding)

#         os.remove(temp_path)
#         if(results[0] == True):
#             studentName = im_path;
#             return studentName;

#     # NO FACE HAS MATCHED 
#     return 'no';

