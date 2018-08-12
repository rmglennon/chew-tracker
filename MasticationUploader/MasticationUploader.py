import argparse
import datetime
import serial
import json
import requests

# URL which to upload the mastication data.
url = 'https://stupid-chew.firebaseio.com/.json'

# Main.
def main():
	parser = argparse.ArgumentParser(description='Upload mastication data.')
	parser.add_argument('--port', required=True, help='Mastication sensor serial port.')
	args = parser.parse_args()

	ser = serial.Serial(args.port, 9600, timeout = 1);

	while True:
		line = ser.readline().decode('ascii')
		if (line.startswith('Detected chomp')):
			print('Got chomp, uploading...')

			payload = { "date": datetime.datetime.now().isoformat() }
			r = requests.post(url, data=json.dumps(payload))
			print('request: ' + str(payload) + ", response: " + r.text)

if __name__ == "__main__":
	main()