(function(){

    var waypoint2 = new Waypoint({
        element: document.getElementById('guestsNote'),
        handler: function (direction) {
            remoteTop = 1050;
            ropeHeight = 550;
            top = 800;

            if (direction === 'down') {
                moveRemote(1050);
            }
            else if (direction === 'up') {
                moveRemote(0);
            }
        }
    });

    var waypoint1 = new Waypoint({
        element: document.getElementById('programNote'),
        handler: function (direction) {
            remoteTop = 1050 + 1050;
            ropeHeight = 550 + 1050;
            top = 800 + 1050;
            if (direction === 'down') {
                moveRemote(1050);
            }
            else if (direction === 'up') {
                moveRemote(0);
            }
        }
    });

    var waypoint3 = new Waypoint({
        element: document.getElementById('photoNote'),
        handler: function (direction) {
            remoteTop = 1050 + 1050 + 1050;
            ropeHeight = 550 + 1050 + 1050;
            top = 800 + 1050 + 1050;

            if (direction === 'down') {
                moveRemote(1050);
            }
            else if (direction === 'up') {
                moveRemote(0);
            }
        }
    });

    var waypoint4 = new Waypoint({
        element: document.getElementById('contactNote'),
        handler: function (direction) {
            remoteTop = 1050 + 1050 + 1050 + 1050;
            ropeHeight = 550 + 1050 + 1050 + 1050;
            top = 800 + 1050 + 1050 + 1050;
            if (direction === 'down') {

            }
            else if (direction === 'up') {
                moveRemote(0);
            }
        }
    });
})();