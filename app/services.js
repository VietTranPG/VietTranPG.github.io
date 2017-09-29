app.factory('SocketService', function (socketFactory,$rootScope) {   
    
    $rootScope.socket={
        on:function(){

        },
        emit:function(){

        }
    };
    var myIoSocket = io.connect(SOCKET_API);
    mySocket = socketFactory({
        ioSocket: myIoSocket
    });
    $rootScope.socket = mySocket
    return mySocket;
})
app.factory('roomIdService', function (SocketService,$rootScope) {     
    function getRoomID(){
        let user = JSON.parse(window.localStorage.getItem('LS_USER'));
        if (window.localStorage.getItem('LS_USER')) {
            let user = JSON.parse(window.localStorage.getItem('LS_USER'));
            $rootScope.socket.emit('authenticate', { token: user.token });
            return user.room_id;
        }else{
            return null;
        }
    }
    return {
        getRoomID:getRoomID
    }
})
app.factory('Chat', function ($rootScope, $ionicScrollDelegate, roomIdService) {
    var roomId;
    var currentDate = new Date();
    var timezone = (currentDate.getTimezoneOffset() / -60);
    function init(){
        roomId = roomIdService.getRoomID();
        console.log('init: ',roomId)
    }
    init();
    function convertTime(time) {
        return moment(time).add(timezone, 'hours').toDate();
    }
    $rootScope.socket.on('chat_receive', function (res) {
        res.Data.send_time = convertTime(res.Data.send_time);
        console.log(res);
        addMessage(res);
    });
    $rootScope.socket.on('chat_send', function (res) {
        res.Data.send_time = convertTime(res.Data.send_time);
        console.log(res);
        addMessage(res);
    });
    var scrollBottom = function () {
        $ionicScrollDelegate.resize();
        $ionicScrollDelegate.scrollBottom(true);
    };
    var addMessage = function (res) {
        $rootScope.histories.unshift(res.Data);
        scrollBottom();
    };
    return {
        init:init,
        sendMessage: function (msg) {
            scrollBottom();
            $rootScope.socket.emit('chat_send', { 'room_id': roomId, 'message': msg, 'phone_number': null });
        },
        scrollBottom: function () {
            scrollBottom();
        },
        sendMessageImage: function (msg) {
            $rootScope.socket.emit('chat_send', { 'room_id': roomId, 'message': msg, 'phone_number': null, 'message_type': MESSAGE_IMAGE });

        }

    };
})
app.factory('userInfor', function () {
    var obj = {
        email:'',
        password:'',
        last_name:'',
        confirm_password:'',
        phone:'',
        dob:'',
        first_name:'',
        insurance:'',
        credit_card:'', 
        allergies:''      
    }
    function defaultObj(){
        obj = {
            email:'',
            password:'',
            last_name:'',
            confirm_password:'',
            phone:'',
            dob:'',
            first_name:'',
            insurance:'',
            credit_card:'', 
            allergies:''      
        }
    }
    function setData(data){
        obj = data
    }
    function setAllergies(data){
        obj.allergies = data;
    }
    function setInsurance(data){
        obj.insurance = data;
    }
    function setPayment(data){
        obj.credit_card = data;
    }
    function getData(){
        return obj;
    }
    return {
        defaultObj:defaultObj,
        setData:setData,
        getData:getData,
        setAllergies:setAllergies,
        setInsurance:setInsurance,
        setPayment:setPayment
    }
})