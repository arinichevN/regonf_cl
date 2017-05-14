function Path() {
    this.container = null;

    this.init = function () {
        this.container = cd();
        cla(this.container,"path");
        a(this.container, [this.n_cont, this.time_cont]);

    };
    this.push=function(slave){
        var e1=c("span");
        e1.innerHTML="/";
        var e2=c("span");
        e2.innerHMTL=slave.getName();
        e2.onclick=function(){
          showV(slave);  
        };
        cla(e2,"interactive");
        a(this.container,[e1,e2]);
    };
}
var path = new Path();
elem.push(path);

