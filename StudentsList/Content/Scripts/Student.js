function Student(id, fName, lName, sName, sex, bDate, incomDate, subjects) {
    this._id = id;
    this._fName = fName;
    this._lName = lName;
    this._sName = sName;
    this._sex = sex;
    this._bDate = bDate;
    this._incomDate = incomDate;
    this._subjects = subjects;

    //Добавление предмета.подумать
    this.addingSubject = function (newSubject) {
        this._subjects.push(newSubject);
    };

    this.getJSONString = function () {
        return {
            "Id": this._id,
            "FName": this._fName,
            "LName": this._lName,
            "SName": this._sName,
            "Sex": this._sex,
            "BDate": this._bDate,
            "IncomDate": this._incomDate,
            "Subjects": this._subjects
        };
    }
}