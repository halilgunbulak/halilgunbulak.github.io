import wave
import math
import struct
import random
import os

def write_wav(filename, data):
    with wave.open(filename, 'w') as f:
        f.setnchannels(1) # Mono
        f.setsampwidth(2) # 16-bit
        f.setframerate(44100)
        f.writeframes(data)
    print(f"Generated {filename}")

def generate_shoot():
    # Shoot: High to low frequency sweep (Chirp)
    duration = 0.15 # seconds
    sample_rate = 44100
    n_samples = int(sample_rate * duration)
    data = bytearray()
    
    start_freq = 800.0
    end_freq = 100.0
    
    for i in range(n_samples):
        t = float(i) / sample_rate
        # Linear sweep? Exponential sounds better but let's do linear for simplicity or simple decay
        freq = start_freq + (end_freq - start_freq) * (t / duration)
        
        # Sine wave
        value = math.sin(2.0 * math.pi * freq * t)
        
        # Apply envelope (Attack/Decay)
        envelope = 1.0 - (t / duration) 
        
        sample = int(value * envelope * 32767.0)
        data += struct.pack('<h', sample)
        
    return data

def generate_explosion():
    # Explosion: White noise with decay
    duration = 0.4
    sample_rate = 44100
    n_samples = int(sample_rate * duration)
    data = bytearray()
    
    for i in range(n_samples):
        # Noise
        value = random.uniform(-1.0, 1.0)
        
        t = float(i) / sample_rate
        # Exponential decay
        envelope = math.exp(-10.0 * t)
        
        sample = int(value * envelope * 32767.0)
        data += struct.pack('<h', sample)
        
    return data

if __name__ == "__main__":
    output_dir = "/mtype/sounds"
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
        
    shoot_data = generate_shoot()
    write_wav(os.path.join(output_dir, "shoot.wav"), shoot_data)
    
    explosion_data = generate_explosion()
    write_wav(os.path.join(output_dir, "explosion.wav"), explosion_data)
