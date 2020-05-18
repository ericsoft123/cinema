const assert=require("chai").assert;
const my_models=require("../models/services");


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

  async function book_seat(name,email,tel,seat_id) {
    var book_seat=await my_models.main_method["book_seat"](name,email,tel,seat_id);
    return book_seat.result_query;
  }
  describe('#book_seat()', () => {
    it('This first one must return true because data is available', async () => {
      const p = await book_seat('eric','kebine123@gmail.com','086767','s_3')
      assert.equal(p,true);
    });
  
  });

  async function cancel_seat(seat_id) {
    var cancel_seat=await my_models.main_method["cancel_seat"](seat_id);
    return cancel_seat.result_query;
  }
  describe('#cancel_seat()', () => {
    it('This first one must return true because data is available', async () => {
      const p = await cancel_seat('s-1')
      assert.equal(p,true);
    });
  
    it('this second one must return false ', async () => {
      const p = await cancel_seat('s-200')
      assert.equal(p,false);
    });
  });

  async function update_seat(seat_id,status) {
    var update_seat=await my_models.main_method["update_seat"](seat_id,status);
    return update_seat.result_query;
  }
  describe('#update_seat()', () => {
    it('This first one must return true because data is available', async () => {
      const p = await update_seat('s-1')
      assert.equal(p,true);
    });
  
    it('this second one must return false ', async () => {
      const p = await update_seat('s-200')
      assert.equal(p,true);
    });
  });

  
  async function sent_email(name,email,tel,seat_id,seat_number) {
    var sent_email=await my_models.main_method["sent_email"](name,email,tel,seat_id,seat_number);
    return sent_email.result_query;
  }
  describe('#sent_email()', () => {
    it('This first one must return true because data is available', async () => {
      const p = await sent_email('eric','kebine123@gmail.com','086767','s_3','5');
      assert.equal(p,true);
    });
  
   
  });

