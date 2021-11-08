# Getting started with flask server

1. pip install flask
2. go to web-server through terminal or command prompt
3. If you use mac or linux run `export FLASK_APP=start.py` (If you use a different terminal run `set FLASK_APP=start.py`)
4. add another env variable `export FLASK_ENV=development` which will start the server at port 8000
5. run `python3 start.py` to start the server

Once the server is running you can retrieve tweets at `/tweets` where the GET request will take place
Add query params through ?query= for example (http://localhost:8000/tweets?query=Apple)
You can also add limit params like http://localhost:8000/tweets?query=Apple&limit=20 