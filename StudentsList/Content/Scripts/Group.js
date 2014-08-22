function Group(groupId, groupName, groupStudents) {
    this.id = groupId;
    this.name = groupName;
    this.students = groupStudents;
    this.getJSONString = function () {
        return {
            "Id": this._id,
            "Name": this._name,
            "Students": this.students
        };
    }
}
