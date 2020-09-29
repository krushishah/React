import csv

f = open('test-report.csv')
csv_f = csv.reader(f)
array= []
for row in csv_f :
    array.append(row)

date = array[0][0]
test = []
testresult = []
testname =[]
print(array)
for i in range(len(array)-6) :
    print(array[i][0].find("PASS"))
    print("array : "+ array[i][0])
    if(array[i][0].find("PASS") == 0):
        test.append(array[i][0])

for i in range(len(test)) :
    print(test[i].find("js"))
    pos =(test[i].find("js") + 2)
    print(test[i][13:pos])
    if(test[i].find("PASS") == 0) :
        testresult.append(test[i][:4])
        testname.append(test[i][14:pos])


        
    

    
