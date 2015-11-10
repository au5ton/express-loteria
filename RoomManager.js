/*
*  RoomManager.js
*
*/

var shuffle = require('knuth-shuffle').knuthShuffle;

var manager = {};

var LOTERIA_CARDS = [];

for(var i = 1; i <= 54; i++) {
    LOTERIA_CARDS.push(i);
}

manager.rooms = [];

function Slot(card) {
    this.card = card;
    this.filled = false;
}

function GameManager() {
    this.full_queue = [];
    this.shown_queue = [];

    this.checkForWin = function(room, user) {
        var slots = [];
        room = manager.getRoomByName(room);
        if(this.isWinningBoard(room.getMemberByName(user).slots)) {
            return true;
        }
        return false;
    };

    this.markSlot = function(room, user, slot) {
        for(var i = 0; i < shown_queue.length; i++) {
            if(shown_queue[i] === slot) {
                manager.getRoomByName(room).getMemberByName(user).slots[slot] = filled;
                return true;
            }
        }
        return false;
    };

    this.generateSlots = function() {
        //takes the first 16 from generateFullQueue
        var full_queue = this.generateFullQueue().slice(0,16);
        var arr = [];
        for(var i = 0; i < full_queue.length; i++) {
            arr.push({card: full_queue[i], filled: (Math.round(Math.random()) === 1)});
        }

        return arr;
    };

    this.generateFullQueue = function() {
        return shuffle(LOTERIA_CARDS.slice(0));
    };

    this.isWinningBoard = function(slots) {

    //check for columns
    var good = 0;
    for(var i = 0; i < 4; i++) {
        for(var j = i; j < slots.length; j+=4) {
            if(slots[j].filled === true) {
                good++;
            }
        }
        if(good === 4) {
            console.log('won by columns')
            return true;
        }
        else {
            good = 0;
        }
    }

    //check for rows
    var sequential = 0;
    for(var i = 0; i < slots.length; i+=4) {
        for(var j = i; j < i+4; j++) {
            if(slots[j].filled === true) {
                sequential++;
            }
        }
        if(sequential === 4) {
            console.log('won by rows');
            return true;
        }
        else {
            sequential = 0;
        }
    }

    if(slots[0].filled && slots[3].filled && slots[12].filled && slots[15].filled) {
        return true;
    }
    if(slots[0].filled && slots[5].filled && slots[10].filled && slots[15].filled) {
        return true;
    }
    if(slots[3].filled && slots[6].filled && slots[9].filled && slots[12].filled) {
        return true;
    }

    return false;

};
}
var Game = new GameManager();

function Member(name) {
    this.name = name.toLowerCase();
    this.score = 0;
    this.slots = [];

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

function Room(name, host, game) {
    this.name = name.toLowerCase();
    this.host = host.toLowerCase();
    this.game = new GameManager();
    this.has_started = false;

    this.members = [];

    this.addMember = function(name) {
        if(this.has_started === false) {
            name = name.toLowerCase();
            if(this.memberExists(name) === false) {
                return this.members.push(new Member(name));
            }
        }
    };

    this.removeMember = function(name) {
        name = name.toLowerCase();
        for(var i = 0; i < this.members.length; i++) {
            if(this.members[i].name === name) {
                this.members.splice(i,1);
            }
        }
    };

    this.memberExists = function(name) {
        name = name.toLowerCase();
        for(var i = 0; i < this.members.length; i++) {
            if(this.members[i].name === name) {
                return true;
            }
        }
        return false;
    };

    this.getMemberByName = function(name) {
        for(var i = 0; i < this.members.length; i++) {
            if(this.members[i].name === name) {
                return this.members[i];
            }
        }
        return null;
    };
}

manager.addRoom = function(name, host) {
    name = name.toLowerCase();
    host = host.toLowerCase();
    manager.rooms.push(new Room(name, host));
};

manager.getRoomByName = function(name) {
    name = name.toLowerCase();
    for(var i = 0; i < manager.rooms.length; i++) {
        if(manager.rooms[i].name === name) {
            return manager.rooms[i];
        }
    }
    return null;
}

manager.roomExists = function(name) {
    name = name.toLowerCase();
    for(var i = 0; i < manager.rooms.length; i++) {
        if(manager.rooms[i].name === name) {
            return true;
        }
    }
    return false;
};

manager.closeRoom = function(name) {
    name = name.toLowerCase();
    for(var i = 0; i < manager.rooms.length; i++) {
        if(manager.rooms[i].name === name) {
            manager.rooms.splice(i,1);
        }
    }
}

manager.joinRoom = function(name, user) {
    name = name.toLowerCase();
    user = user.toLowerCase();
    for(var i = 0; i < manager.rooms.length; i++) {
        if(manager.rooms[i].name === name) {
            manager.rooms[i].addMember(user);
        }
    }
}

manager.groupHasMember = function(name, user) {
    name = name.toLowerCase();
    user = user.toLowerCase();
    for(var i = 0; i < manager.rooms.length; i++) {
        if(manager.rooms[i].name === name && manager.rooms[i].memberExists(user)) {
            return true;
        }
    }
    return false;
};

manager.userHasGroup = function(user) {
    user = user.toLowerCase();
    for(var i = 0; i < manager.rooms.length; i++) {
        if(manager.groupHasMember(manager.rooms[i].name, user) === true) {
            return true;
        }
    }
    return false;
};

manager.getGroupForMember = function(user) {
    user = user.toLowerCase();
    for(var i = 0; i < manager.rooms.length; i++) {
        if(manager.groupHasMember(manager.rooms[i].name, user) === true) {
            return manager.rooms[i];
        }
    }
    return null;
};

//Game specific stuff

manager.startGame = function(name) {
    name = name.toLowerCase();
    has_started = true;

    var room = manager.getRoomByName(name);
    var shown_index = 0;

    //Doesn't block the main thread
    setTimeout(function(){
        //Prepare the game assets

        room.game.full_queue = Game.generateFullQueue();
        room.game.shown_queue = [];

        for(var i = 0; i < room.members.length; i++) {
            room.members[i].slots = Game.generateSlots();
        }


        manager.rooms[i].game.intervalId = setInterval(function(){


            room.game.shown_queue.unshift(room.game.full_queue[shown_index]);
            if(shown_index < full_queue.length) {
                shown_index++;
            }


        },5000);

    },1);


};

module.exports = manager;
