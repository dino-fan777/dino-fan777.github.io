# Given encrypted password in hexadecimal
encrypted_password = [
    0x75, 0x3A, 0xC0, 0xC8, 0x33, 0xCF, 0xCC, 0x2E, 
    0xCC, 0xC7, 0x17, 0xEC, 0xB0, 0x37, 0xEB, 0x9B, 
    0x70, 0xE6, 0x8C, 0x63, 0xA7
]

def decryptPass(encryptedPassword):
    # Initialize an empty list to store the decrypted bytes
    decrypted_bytes = []
    
    # Hardcoded XOR value (in decimal, 0x54 = 84)
    hardcode_value = 0x54  # 84 in decimal
    
    # Iterate over each byte with a counter
    for counter, byte in enumerate(encryptedPassword):
        # XOR each byte with (hardcode_value * counter)
        xor_result = byte ^ (hardcode_value * counter)
        
        # If the XOR result is greater than 0x7F, take the least significant byte
        if xor_result > 0x7F:
            xor_result = xor_result & 0xFF  # Mask to get the least significant byte
        
        # Append the result to the list
        decrypted_bytes.append(xor_result)
        
        # Print each step for clarity
        print(f"Byte {counter}: 0x{byte:02X} XOR (0x{hardcode_value:02X} * {counter}) = 0x{xor_result:02X}")
    
    # Convert the decrypted bytes back to a string
    decrypted_string = ''.join([chr(b) for b in decrypted_bytes])
    
    return decrypted_string

# Call the function and print the result
decrypted = decryptPass(encrypted_password)
print("Decrypted password:", decrypted)
