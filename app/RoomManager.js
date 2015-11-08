/*
*  RoomManager.js
*
*/

var manager = {};

manager.rooms = [];

function Member(name) {
    this.name = name;
    this.score = 0;

    this.getName = function() {
        return this.name;
    };

    this.setScore = function(score) {
        this.score = score;
    };

    this.incrementScore = function(score) {
        this.score++;
    }
}

function Room(name, host) {
    this.name = name;
    this.host = host;

    this.members = [];

    this.addMember = function(name) {
        if(this.memberExists(name) === false) {
            return this.members.push(new Member(name));
        }
    };

    this.removeMember = function(name) {
        for(var i = 0; i < this.members.length; i++) {
            if(this.members[i].name === name) {
                this.members.splice(i,1);
            }
        }
    };

    this.memberExists = function(name) {
        for(var i = 0; i < this.members.length; i++) {
            if(this.members[i].name === name) {
                return true;
            }
        }
        return false;
    };
}

manager.addRoom = function(name, host) {
    manager.rooms.push(new Room(name, host));
};

manager.getRoomByName = function(name) {
    for(var i = 0; i < manager.rooms.length; i++) {
        if(manager.rooms[i].name === name) {
            return manager.rooms[i];
        }
    }
}

manager.roomExists = function(name) {
    for(var i = 0; i < manager.rooms.length; i++) {
        if(manager.rooms[i].name === name) {
            return true;
        }
    }
    return false;
};

manager.closeRoom = function(name) {
    for(var i = 0; i < manager.rooms.length; i++) {
        if(manager.rooms[i].name === name) {
            manager.rooms.splice(i,1);
        }
    }
}

manager.joinRoom = function(name, user) {
    for(var i = 0; i < manager.rooms.length; i++) {
        if(manager.rooms[i].name === name) {
            console.log()
            manager.rooms[i].addMember(user);
        }
    }
}









module.exports = manager;
