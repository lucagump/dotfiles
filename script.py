chiaveDiCifratura = (2, 8, -1, 4)
chiavePerDecriptare = (-2, -8, 1, -4)
def cripta(stringa, chiave):
    stringaCifrata = ""
    i = 0
    for lettera in stringa:
        stringaCifrata += chr((ord(lettera) + chiave[i]) % 128)
        i += 1
        if i >= len(chiave):
            i = 0
    return stringaCifrata

def criptaFile(nomeFile):
    f = open(nomeFile, "r")
    contenuto = f.read()
    f.close()
    contenutoCriptato = cripta(contenuto, chiaveDiCifratura)
    f = open(nomeFile, "w")
    f.write(contenutoCriptato)
    f.close()

def decriptaFile(nomeFile):
    f = open(nomeFile, "r")
    contenuto = f.read()
    f.close()
    contenutoCriptato = cripta(contenuto, chiavePerDecriptare)
    f = open(nomeFile, "w")
    f.write(contenutoCriptato)
    f.close()

#criptaFile("cosedafare.txt")
#decriptaFile("cosedafare.txt")
