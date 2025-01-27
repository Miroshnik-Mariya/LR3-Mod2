const person = `
    {
        "lastName": "Иванов",
        "firstName": "Иван",
        "marks": [
            {
                "subject": "Математика",
                "mark": 5
            },
            {
                "subject": "Физика",
                "mark": 5
            },
            {
                "subject": "Информатика",
                "mark": 5
            }
        ]
    }
    `;


function PrintInfoPerson(person) {
    const personInfo = JSON.parse(person);
    console.log(`Фамилия: ${personInfo.lastName}`);
    console.log(`Имя: ${personInfo.firstName}`);
    console.log("Оценки:");

    personInfo.marks.forEach(mark => {
        console.log(`${mark.subject}: ${mark.mark}`);
    });
}


class Student {
    constructor(lastname, firstname, marks) {
        try {
            this.lastname = lastname;
            this.firstname = firstname;
            if (marks != null) {
                this.marks = marks.map(mark => new Mark(mark.subject, mark.mark));
            }
            else {
                this.marks = [];
            }
        }
        catch
        {
            console.log("Некорректный ввод данных");
        }
    }
    getAverageMark() {
        if (this.marks.length === 0) {
            return null; // Если нет оценок, возвращаем null
        }
        let sum = 0;
        for (const mark of this.marks) {
            sum += mark.mark;
        }
        return sum / this.marks.length;
    }

    SubjectMark(subject)
    {
        const subjectMarks = this.marks.filter(mark => mark.subject === subject);
        return subjectMarks;
    }

    AddMark(sub, m)
    {
        const newMark = new Mark(sub, m);
        this.marks.push(newMark);
    }

    DeleteMarks(subject) {
        this.marks = this.marks.filter(mark => mark.subject !== subject);
    }
}

class Mark {
    constructor(subject, mark) {
        this.subject = subject;
        this.mark = mark;
    }

    printMark() {
        console.log(`${this.subject}: ${this.mark}`);
    }
}

PrintInfoPerson(person);


//создаём нового ученика
let full = prompt("Введите фамилию:");
let name = prompt("Введите имя:");
let sub = prompt("Введите предмет:");
let value = prompt("Введите оценку:");

const mark = new Mark(sub, parseFloat(value));
const user = new Student(full, name, [mark]);

console.log(`Фамилия: ${user.lastname}`);
console.log(`Имя: ${user.firstname}`);
console.log("Оценки:");
user.marks.forEach(mark => {
    console.log(`${mark.subject}: ${mark.mark}`);
});

//средний балл 
console.log(`Средний балл по всем предметам: ${user.getAverageMark()}`);

//добавление оценки
let a = prompt("Введите предмет:");
let b = prompt("Введите оценку:");
user.AddMark(a, b);
console.log("Оценки:");
user.marks.forEach(mark => {
    console.log(`${mark.subject}: ${mark.mark}`);
});

//узнаём оценки 
let valueSub = prompt("Введите предмет, оценки по которому хотите узнать:");
let subMark = user.SubjectMark(valueSub);
console.log(`Оценки по предмету ${valueSub}:`);
if (subMark.length > 0) {
    subMark.forEach(mark => console.log(mark.mark));
} else {
    console.log(`Нет оценок по предмету ${valSub}`);
}

//удаление оценок 
valueSub = prompt("Введите предмет, оценки по которому хотите удалить:");
subMark = user.DeleteMarks(valueSub);
console.log("Оценки:");
user.marks.forEach(mark => {
    console.log(`${mark.subject}: ${mark.mark}`);
});

