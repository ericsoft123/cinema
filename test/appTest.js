const assert=require("chai").assert;
const app=require("../app");

describe("App",function(){
    it("test App files",function(){
assert.equal(app(),false);
    });
});