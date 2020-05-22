const assert=require("chai").assert;
const my_models=require("../models/services");





async function book_seat(name,email,tel,seat_id) {
    var book_seat=await my_models.main_method["book_seat"](name,email,tel,seat_id);
    return book_seat.result_query;
  }
  describe('#book_seat()', () => {
    it('This first one must return true because data is available', async () => {
      const p = await book_seat('eric','ericsoft123@gmail.com','086767','s-1')
      assert.equal(p,true);
    });
  
  });
async function check_seat(seat_id, email) {
    var check_seat=await my_models.main_method["check_seat"](seat_id,email);
    return check_seat.result_query;
  }
  describe('#check_seat()', () => {
    it('This first one must return true because data is available', async () => {
      const p = await check_seat('s-1','ericsoft123@gmail.com')
      assert.equal(p,true);
    });
  
    it('this second one must return false ', async () => {
      const p = await check_seat('s-12','ericsoft123@gmail.com')
      assert.equal(p,false);
    });
  });

  

  async function cancel_seat(seat_id,email) {
    var cancel_seat=await my_models.main_method["cancel_seat"](seat_id,email);
    return cancel_seat.result_query;
  }
  describe('#cancel_seat()', () => {
    it('This first one must return true because data is available', async () => {
      const p = await cancel_seat('s-1,ericsoft123@gmail.com')
      assert.equal(p,true);
    });
  
    it('this second one must return false ', async () => {
      const p = await cancel_seat('s-200,ericsoft123@gmail.com')
      assert.equal(p,true);
    });
  });

async function sent_email(name,email,tel,seat_id,seat_number) {
  var sent_email=await my_models.main_method["sent_email"](name,email,tel,seat_id,seat_number);
  return sent_email.result_query;
}

describe('#sent_email()', function() {
  this.timeout(30000);
  it('This first one must return true because data is available', function(done) {
    sent_email('eric','kebine123@gmail.com','086767','s_3','5').
      then(res => {
      
        // `done()` with no parameters means the test succeeded
        done();
      }).
      // If you pass a parameter to `done()`, Mocha considers that an error
      catch(err => done(err));
  });
});


