export default function generSchedule(enteredGroups, enteredTeachers, enteredSubjects, enteredClassrooms, time, lecForAllGroup) {
    class Classroom {
        constructor(numberClassroom, typeSubjects, placeCount) {
            this.numberClassroom = numberClassroom;
            this.typeSubjects = typeSubjects;
            this.placeCount = placeCount;
        }
    }

    class Group {
        constructor(numberOfStudents, course, nameGroup) {
            this.course = course;
            this.nameGroup = nameGroup;
            this.numberOfStudents = numberOfStudents;
        }
    }

    class Subject {
        constructor(nameSubject, groupsWithSubject, lecture, practice, lab) {
            this.nameSubject = nameSubject;
            this.groupsWithSubject = groupsWithSubject;
            this.lecture = lecture;
            this.practice = practice;
            this.lab = lab;
        }

    }

    class Teacher {
        constructor(nameTeacher, subjects) {
            this.nameTeacher = nameTeacher;
            this.subjects = subjects;

        }
    }

    class PartSchedule {
        constructor(groupForPart, teacherForPart, subjectName, typeSubj, hours) {
            this.groupForPart = groupForPart;
            this.teacherForPart = teacherForPart;
            this.subjectName = subjectName;
            this.typeSubj = typeSubj;
            this.hours = hours;
        }

    }

    class Schedule {
        constructor(groups, teachers, subjects, classrooms, time, lecForAllGroup) {
            this.groups = groups;
            this.teachers = teachers;
            this.subjects = subjects;
            this.classrooms = classrooms;
            this.time = time;
            this.lecForAllGroup = lecForAllGroup;
            this.generateSchedule(this.groups, this.teachers, this.subjects, this.classrooms, this.time, this.lecForAllGroup);

        }
        schedule;
        lessons;
        random(min, max) {
            let rand = min + Math.random() * (max + 1 - min);
            rand = Math.floor(rand);
            return rand;
        }
        randomIncrement(min, max, num) {
            if (num === undefined) {
                return this.random(min, max);
            }
            num++;
            return num > max ? min : num;
        }
        sortSubjByType(a, b) {
            if (b.typeSubj === a.typeSubj) {
                return 0;
            } else if (a.typeSubj === 'lecture') {
                return -1;
            } else if (b.typeSubj === 'lecture') {
                return -1;
            }
            return 1;
        }
        subjectPush(subject, type, group) {
            let result = [],
                count = subject[type];
            while (count) {
                result.push(new PartSchedule(group, null, subject.nameSubject, type, 1));
                count--;
            }
            return result;
        }
        listSubjects(groups, subjects, lecsForAllGroups) {
            let list = [];
            groups.forEach(group => {
                subjects.forEach(subject => {
                    if (subject.groupsWithSubject.includes(group)) {
                        let res = [].concat(this.subjectPush(subject, 'practice', [group]), this.subjectPush(subject, 'lab', [group]));
                        list = list.concat(res);
                    }
                });
            });
            if (lecsForAllGroups) {
                subjects.forEach(subject => {
                    list = list.concat(this.subjectPush(subject, 'lecture', subject.groupsWithSubject));
                });
            } else {
                groups.forEach(group => {
                    subjects.forEach(subject => {
                        if (subject.groupsWithSubject.includes(group)) {
                            let res = [].concat(this.subjectPush(subject, 'lecture', [group]));
                            list = list.concat(res);
                        }
                    });
                });
            }

            return list;
        }
        generateEmptySchedule(weeksCount, daysCount, lessonsCount, classrooms) {
            let
                schedule = [],
                lessons = [];

            const classroomsNumbers = classrooms.map(classroom => classroom.numberClassroom);
            for (let weekIndex = 0; weekIndex < weeksCount; weekIndex++) {
                schedule.push([]);
                for (let dayIndex = 0; dayIndex < daysCount; dayIndex++) {
                    schedule[weekIndex].push([]);
                    for (let lessonIndex = 0; lessonIndex < lessonsCount; lessonIndex++) {
                        schedule[weekIndex][dayIndex].push({});
                        classroomsNumbers.forEach(number => {
                            schedule[weekIndex][dayIndex][lessonIndex][number] = null;
                        });
                        lessons.push(schedule[weekIndex][dayIndex][lessonIndex]);
                    }
                }
            }
            return {
                schedule,
                lessons,
            };
        }
        generateSchedule(groups, teachers, subjects, classrooms, time, lecForAllGroup) {
            const [numberOfWeeks, numberOfDays, numberOfLessons] = time,
            subjectsList = this.listSubjects(groups, subjects, lecForAllGroup).sort(this.sortSubjByType),
                emptySchedule = this.generateEmptySchedule(...time, classrooms);
            this.schedule = emptySchedule.schedule;
            this.lessons = emptySchedule.lessons;

            const
                lessonFrom = 0,
                lessonTo = (numberOfDays * numberOfLessons) - 1;

            subjectsList.find(subject => {
                const
                    matchTeachers = this.findTeachers(subject.subjectName, subject.typeSubj, teachers),
                    teachersTo = matchTeachers.length - 1,
                    matchAuditorys = this.findRooms(subject.typeSubj, subject.groupForPart, classrooms),
                    auditorysTo = matchAuditorys.length - 1;
                let
                    lessonIndex = this.random(lessonFrom, lessonTo),
                    lessonIndexTarget = lessonIndex,
                    lesson,
                    teacherIndex = this.random(0, teachersTo),
                    teacherIndexTarget = teacherIndex,
                    teacher,
                    auditoryIndex = this.random(0, auditorysTo),
                    auditoryIndexTarget = auditoryIndex,
                    auditory,
                    notFoundFlag = true;
                do {
                    lessonIndex = this.randomIncrement(lessonFrom, lessonTo, lessonIndex);
                    lesson = this.lessons[lessonIndex];
                    if (!this.checkGroup(lesson, subject.groupForPart)) {
                        do {
                            teacherIndex = this.randomIncrement(0, teachersTo, teacherIndex);
                            teacher = matchTeachers[teacherIndex];
                            if (!this.checkTeacher(lesson, teacher)) {
                                do {
                                    auditoryIndex = this.randomIncrement(0, auditorysTo, auditoryIndex);
                                    auditory = matchAuditorys[auditoryIndex].numberClassroom;
                                    notFoundFlag = lesson[auditory] !== null;
                                } while (auditoryIndex !== auditoryIndexTarget && notFoundFlag);
                            }
                        }
                        while (teacherIndex !== teacherIndexTarget && notFoundFlag);
                    }
                }
                while (lessonIndex !== lessonIndexTarget && notFoundFlag);
                if (notFoundFlag) {
                    console.log(subject);
                    throw new Error('Not found needed conditions');
                }

                subject.teacherForPart = teacher;
                lesson[auditory] = subject;
            });
            return this.schedule;
        }
        findTeachers(lesson, type, teachers) {
            let resultArr = [];
            teachers.forEach(teacher => {
                let subj = teacher.subjects.get(lesson);
                if (subj && subj.includes(type)) {
                    resultArr.push(teacher);
                }
            });
            return resultArr;
        }

        findRooms(lesson, groups, classes) {
            let numberOfStudents = groups.reduce((sum, current) => sum + current.numberOfStudents, 0);
            let resultArr = [];
            classes.forEach(auditory => {
                if (auditory.typeSubjects.includes(lesson) && auditory.placeCount >= numberOfStudents) {
                    resultArr.push(auditory);
                }
            });
            return resultArr;
        }

        checkTeacher(currentClassrooms, teacher) {
            if (currentClassrooms) {
                for (let auditory in currentClassrooms) {
                    if (currentClassrooms[auditory] && currentClassrooms[auditory].teacherForPart.nameTeacher === teacher.nameTeacher) {
                        return true;
                    }
                }
            }
            return false;
        }

        checkGroup(currentClassrooms, group) {
            if (currentClassrooms) {
                for (let auditory in currentClassrooms) {
                    if (currentClassrooms[auditory]) {
                        for (let index = group.length - 1; index > -1; index--) {
                            if (currentClassrooms[auditory].groupForPart.includes(group[index])) {
                                return true;
                            }
                        }
                    }
                }
            }
            return false;
        }

    }
    class TransformingInputData {
        constructor(enteredGroups, enteredTeachers, enteredSubjects, enteredClassrooms) {
            this.enteredGroups = enteredGroups;
            this.enteredTeachers = enteredTeachers;
            this.enteredSubjects = enteredSubjects;
            this.enteredClassrooms = enteredClassrooms;
            this.transformClassrooms(this.enteredClassrooms);
            this.transformGroups(this.enteredGroups);
            this.transformSubjects(this.enteredSubjects);
            this.transformTeachers(this.enteredTeachers);
        }
        transformedGroups;
        transformedTeachers = [];
        transformedSubjects;
        transformedClassrooms;

        transformClassrooms(classrooms) {
            this.transformedClassrooms = classrooms.map(classroom => {
                let typeSubject;
                if (classroom['Лекція'] === true) {
                    typeSubject = 'lecture';
                } else if (classroom['Лабораторна'] === true) {
                    typeSubject = 'lab';
                } else if (classroom['Практика'] === true) {
                    typeSubject = 'practice';
                }
                return new Classroom(+classroom['Номер аудиторії'],
                    typeSubject, +classroom['Кількість місць']
                );

            });
        }
        transformGroups(groups) {
            this.transformedGroups = groups.map(group => {
                return new Group(+group['Кількість студентів'], +group['Курс'], group['Група'])
            })
        }
        transformSubjects(subjects) {
            this.transformedSubjects = subjects.map(subject => {
                let nameGroups = subject['Група'].split(' ');
                let targetGroup = this.transformedGroups.filter(group => {
                    return nameGroups.includes(group.nameGroup);
                });
                return new Subject(
                    subject['Назва дисципліни'],
                    targetGroup, +subject['Лекції'], +subject['Практичні'], +subject['Лабораторні'])

            })
        }
        transformTeachers(teachers) {
            teachers.forEach(teacher => {
                let typeSubjects = [];
                let teacherIndex = this.transformedTeachers.findIndex(transformedTeacher => transformedTeacher.nameTeacher === teacher['ПІБ викладача']);
                if (teacher['Лекції'] === true) {
                    typeSubjects.push('lecture');
                }
                if (teacher['Лабораторні'] === true) {
                    typeSubjects.push('lab');
                }
                if (teacher['Практичні'] === true) {
                    typeSubjects.push('practice');
                }

                if (teacherIndex !== -1) {
                    this.transformedTeachers[teacherIndex].subjects.set(teacher['Дисципліна'], typeSubjects);
                } else {
                    this.transformedTeachers.push(new Teacher(
                        teacher['ПІБ викладача'],
                        new Map([
                            [teacher['Дисципліна'], typeSubjects]
                        ])
                    ))
                }
            })
        }
    }
    let classrooms = [
        new Classroom(101, 'lab', 25),
        new Classroom(102, 'lecture', 50),
        new Classroom(103, 'practice', 30),
        new Classroom(104, 'lab', 15),
        new Classroom(105, 'lecture', 50),
        new Classroom(106, 'lecture', 45),
        new Classroom(107, 'lecture', 45),
        new Classroom(108, 'lab', 25),
        new Classroom(109, 'practice', 30),
        new Classroom(110, 'lab', 20),
    ];
    let groups = [
        new Group(22, 4, 1),
        new Group(22, 4, 2),
    ]
    let subjects = [
        new Subject('МСШІ', [groups[0], groups[1]], 2, 1, 2),
        new Subject('МЗКІТ', [groups[0], groups[1]], 2, 1, 2),
        new Subject('ММДОС', [groups[0], groups[1]], 2, 1, 2),
        new Subject('ТКП', [groups[0], groups[1]], 2, 1, 2),
        new Subject('Економіка', [groups[0], groups[1]], 1, 1, 0),
        new Subject('УІТП', [groups[0], groups[1]], 2, 0, 2),
    ];
    let teachers = [
        new Teacher('Месюра', new Map([
            ['МСШІ', ['lecture', 'practice']],
            ['УІТП', ['lecture', 'practice']],
        ])),
        new Teacher('Крилик', new Map([
            ['МЗКІТ', ['lecture', 'practice', 'lab']],
            ['ММДОС', ['lecture', 'practice', 'lab']],
        ])),
        new Teacher('Причепа', new Map([
            ['Економіка', ['lecture', 'practice']],
        ])),
        new Teacher('Савчук', new Map([
            ['ТКП', ['lecture']],
        ])),
        new Teacher('Ольшанська', new Map([
            ['ТКП', ['lab', 'practice']],
        ])),
        new Teacher('Ваховська', new Map([
            ['МСШІ', ['lab']],
        ])),
        new Teacher('Іванюк', new Map([
            ['УІТП', ['lab']],
        ])),
    ];

    function generateFirstPopulationSchedules(countSchedules, groups, teachers, subjects, classrooms, time, lecForAllGroup) {
        let populationSchedule = [];
        while (countSchedules) {
            populationSchedule.push(new Schedule(groups, teachers, subjects, classrooms, time, lecForAllGroup));
            countSchedules--;
        }
        return populationSchedule;
    }

    function evaluationSchedule() {

    }

    function selectSchedules() {

    }

    function mutationSchedules() {

    }

    function crossingSchedules() {

    }

    function printSchedule(schedule) {
        schedule.forEach((week, weekIndex) => {
            const weekLabel = 'Week: ' + weekIndex;
            console.group(weekLabel);
            week.forEach((day, dayIndex) => {
                const
                    dayLabel = 'Day: ' + dayIndex,
                    dayArray = [];
                console.group(dayLabel);
                day.forEach((lesson, lessonIndex) => {
                    dayArray.push({});
                    for (let auditoryNum in lesson) {
                        let str = null;
                        const auditory = lesson[auditoryNum];
                        if (auditory) {
                            str = auditory.typeSubj + ' ';
                            str += auditory.groupForPart.map(group => group.numberGroup + '|' + group.numberOfStudents).join(', ') + ' ';
                            str += auditory.subjectName + ' ';
                        }
                        dayArray[lessonIndex][auditoryNum] = str;
                    }
                });
                console.table(dayArray);
                console.groupEnd(dayLabel);
            });
            console.groupEnd(weekLabel);
        });
    }

    //let s = new Schedule(groups, teachers, subjects, classrooms, time, true).schedule;
    let transformedInputData = new TransformingInputData(enteredGroups, enteredTeachers, enteredSubjects, enteredClassrooms);
    let schedule = new Schedule(transformedInputData.transformedGroups, transformedInputData.transformedTeachers, transformedInputData.transformedSubjects, transformedInputData.transformedClassrooms, time, lecForAllGroup);
    return schedule.schedule;
}