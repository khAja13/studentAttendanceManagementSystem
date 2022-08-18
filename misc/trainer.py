import os, cv2

imagesDirectory = os.path.join(os.getcwd(), 'images')
imagesFiles = os.listdir(imagesDirectory)

def detect_faces(path, img):
    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)  
    faces = face_cascade.detectMultiScale(gray, 1.1, 4)  
    for (x, y, w, h) in faces:  
        cv2.rectangle(img, (x, y), (x + w, y + h), (255, 0, 0), 2)
    cv2.imwrite(path, img)

def detect_faces_caller():
    for im_path in imagesFiles:
        the_real_path = os.path.join(imagesDirectory, im_path)
        image = cv2.imread(the_real_path)
        print(the_real_path)
        detect_faces(the_real_path, image)

detect_faces_caller()