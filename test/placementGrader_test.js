var assert = require('assert');
var grade = require('../placementGrader.js')

describe('placementGrader', function() {
  describe('5th grade', function() {
    it('if 5th grade, get class 1', function() {
      assert.equal(1, grade(5,2,2,2,2,2,2));
    });
  });
  describe('6th grade', function() {
    it('if 6th grade, perfect score gets 4', function() {
      assert.equal(grade(6,2,2,2,2,2,2), 4);
    });
    it('if 6th grade, all at least 1 with ps of 2 gets 4', function() {
      assert.equal(grade(6,1,1,1,1,1,2), 4);
    });
    it('if 6th grade, arg, ref, or ce < 1 then 3', function() {
      assert.equal(grade(6,1,1,0,1,1,2), 3);
    });
    it('if 6th grade, arg, ref, or ce < 1 then 3', function() {
      assert.equal(grade(6,0,1,1,1,0,2), 3);
    });
    it('if 6th grade, arg, ref, or ce < 1 then 3', function() {
      assert.equal(grade(6,1,0,1,1,0,2), 3);
    });
    it('if 6th grade, arg, ref, or ce < 1 then 3', function() {
      assert.equal(grade(6,1,0,1,1,0,2), 3);
    });
    it('if 6th grade, arg, ref, or ce < 1 then 3', function() {
      assert.equal(grade(6,0,0,0,0,0,1), 3);
    });
  });
  describe('7th grade', function() {
    it('if 7th grade, perfect score gets 5', function() {
      assert.equal(grade(7,2,2,2,2,2,2), 5);
    });
    it('if 7th grade, perfect score gets 5', function() {
      assert.equal(grade(7,2,2,2,2,2,2), 5);
    });
    it('if 7th grade, at least 2 XP and argRefCe > 3 gets 4', function() {
      assert.equal(grade(7,1,1,1,1,1,2), 4);
    });
    it('if 7th grade, at least 2 XP and argRefCe > 3 gets 4', function() {
      assert.equal(grade(7,1,2,1,2,1,2), 4);
    });
    it('if 7th grade, at least 2 XP and argRefCe > 3 gets 4', function() {
      assert.equal(grade(7,1,1,2,2,1,2), 4);
    });
    it('if 7th grade, and any score is zero, gets 3', function() {
      assert.equal(grade(7,0,1,2,2,1,2), 3);
    });
    it('if 7th grade, and any score is zero, gets 3', function() {
      assert.equal(grade(7,1,1,2,0,1,2), 3);
    });
    it('if 7th grade, and any score is zero, gets 3', function() {
      assert.equal(grade(7,1,1,0,1,1,2), 3);
    });
    it('if 7th grade, and any score is zero, gets 3', function() {
      assert.equal(grade(7,1,1,0,1,0,2), 3);
    });
  });
  describe('8th grade', function() {
    it('if 8th grade, perfect score gets 6', function() {
      assert.equal(grade(8,2,2,2,2,2,2), 6);
    });
    it('if 8th grade, at least 2 XP and argRefCe > 3 gets 4', function() {
      assert.equal(grade(8,1,1,1,1,1,2), 4);
    });
    it('if 8th grade, at least 2 XP and argRefCe > 3 gets 4', function() {
      assert.equal(grade(8,1,2,1,2,1,2), 4);
    });
    it('if 8th grade, at least 2 XP and argRefCe > 3 gets 4', function() {
      assert.equal(grade(8,1,1,2,2,1,2), 4);
    });
    it('if 8th grade, and any score is zero, gets 12', function() {
      assert.equal(grade(8,0,1,2,2,1,2), 12);
    });
    it('if 8th grade, and any score is zero, gets 7', function() {
      assert.equal(grade(8,1,1,2,0,1,2), 7);
    });
    it('if 8th grade, and any score is zero, gets 7', function() {
      assert.equal(grade(8,1,1,0,1,1,2), 7);
    });
    it('if 8th grade, and any score is zero, gets 7', function() {
      assert.equal(grade(8,1,1,0,1,0,2), 7);
    });
  });
  describe('9th grade', function() {
    it('if 9th grade, perfect score gets 6', function() {
      assert.equal(grade(9,2,2,2,2,2,2), 6);
    });
    it('if 9th grade, low XP good score gets 12', function() {
      assert.equal(grade(9,0,1,2,2,1,2), 12);
    });
    it('if 9th grade, low XP good score gets 12', function() {
      assert.equal(grade(9,0,0,2,2,1,2), 12);
    });
    it('if 9th grade, and any score is zero, gets 7', function() {
      assert.equal(grade(9,1,1,2,0,1,2), 7);
    });
    it('if 9th grade, and any score is zero, gets 7', function() {
      assert.equal(grade(9,1,1,0,1,1,2), 7);
    });
    it('if 9th grade, and any score is zero, gets 7', function() {
      assert.equal(grade(9,1,1,0,1,0,2), 7);
    });
  });
});
