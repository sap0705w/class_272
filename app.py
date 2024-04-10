import os

from flask import Flask, request, jsonify, render_template, redirect, url_for,send_file
from faker import Faker
from twilio.jwt.access_token import AccessToken
from twilio.jwt.access_token.grants import SyncGrant
from werkzeug.utils import secure_filename

app = Flask(__name__)
fake = Faker()


@app.route('/')
def index():
    return render_template('index.html')

# Add your Twilio credentials
@app.route('/token')
def generate_token():
    TWILIO_ACCOUNT_SID='AC29d19df4be16b5059bee9e541406509c'
    TWILIO_SYNC_SERVICE_SID='ISb2ba3b325f4cb8780cc196c5d551a34b'
    TWILIO_API_KEY='SKcec2b0edca17c52a35f7049ed2794408'
    TWILIO_API_SECRET='RrVaMm8LglUDS5NFK0BIH8F1fprjL61c'

    username = request.args.get('username', fake.user_name())

    # create access token with credentials
    token = AccessToken(TWILIO_ACCOUNT_SID, TWILIO_API_KEY, TWILIO_API_SECRET, identity=username)
    # create a Sync grant and add to token
    sync_grant_access = SyncGrant(TWILIO_SYNC_SERVICE_SID)
    token.add_grant(sync_grant_access)
    return jsonify(identity=username, token=token.to_jwt().decode())

# Write the code here
@app.route('/', methods=['POST'])
def download_text():
    text_from_notepad= request.form['text']
    with open('work_file.txt','w') as f:
        f.write(text_from_notepad)
    return send_file("work_file.txt", as_attachment =True)
    

if __name__ == "__main__":
    app.run(host='localhost', port='5001', debug=True)
