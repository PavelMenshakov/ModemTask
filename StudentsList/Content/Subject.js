function Subject(subjectId, subjectName, subjectHours) {
    this._id = subjectId;
    this._name = subjectName;
    this._hours = subjectHours;
    this.getJSONString = function () {
        return {
            "SubjectId": this._id,
            "SubjectName": this._name,
            "SubjectHours": this._hours
        };
    }
}