# Mastication Uploader

The mastication uploader connects to the given serial port to listen for detected chomps from the
mastication sensor. Upon detecting a chomp, it pushes the data to the firebase database for the application to display.

# Usage
`$ py MasticationUploader.py --port <serial_port>`

# Requirements
* [Pyserial](https://pythonhosted.org/pyserial/)
* [Requests](http://docs.python-requests.org/en/master/)