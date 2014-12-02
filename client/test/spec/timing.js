describe("Test timing", function () {
    it("should be a fast test", function (done) {
        expect("hi").to.equal("hi");
        done();
    });

    it("should be a medium test", function (done) {
        setTimeout(function () {
            expect("hi").to.equal("hi");
            done();
        }, 40);
    });

    it("should be a slow test", function (done) {
        setTimeout(function () {
            expect("hi").to.equal("hi");
            done();
        }, 100);
    });

    it("should be a timeout failure", function (done) {
        setTimeout(function () {
            expect("hi").to.equal("hi");
            done();
        }, 2001);
    });
});

/*global mocha */
// Configure Mocha to continue after first error to show
// both failure examples.
mocha.bail(false);

describe("Test failures", function () {
    it("should fail on assertion", function () {
        expect("hi").to.equal("goodbye");
    });

    it("should fail on unexpected exception", function () {
        throw new Error();
    });
});
