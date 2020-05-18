const assert=require("chai").assert;
const app=require("../models/services");

describe("App",function(){
    it("test App files",function(){
        var mymodel=app.main_method.email_sent();
assert.equal(mymodel.result,true);
    });
});