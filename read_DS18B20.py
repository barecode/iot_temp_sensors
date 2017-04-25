import datetime
import os
import glob
import time

os.system('modprobe w1-gpio')
os.system('modprobe w1-therm')

base_dir = '/sys/bus/w1/devices/'
device_folders = glob.glob(base_dir + '28-*')
devices = map(lambda x: os.path.basename(x), device_folders)
device_files = map(lambda x: x + '/w1_slave', device_folders)

def read_temp_raw(device):
    device_file = base_dir + device + '/w1_slave'
    f = open(device_file, 'r')
    lines = f.readlines()
    f.close()
    return lines

def read_temp(device):
    lines = read_temp_raw(device)
    while lines[0].strip()[-3:] != 'YES':
        time.sleep(0.2)
        lines = read_temp_raw(device)
    equals_pos = lines[1].find('t=')
    if equals_pos != -1:
        temp_string = lines[1][equals_pos+2:]
        temp_c = float(temp_string) / 1000.0
        temp_f = temp_c * 9.0 / 5.0 + 32.0
        return temp_c, temp_f

while True:
    print datetime.datetime.now()
    for device in devices:
	print(device, read_temp(device))
    time.sleep(1)

