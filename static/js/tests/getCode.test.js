const getCode = require('../getCode');

global.fetch = jest.fn(() =>
Promise.resolve({
    json: () => Promise.resolve({ result: "2367"
    }),
})
);


// it("gets promise", async () => {
//     const data = await getCode("normal");
//     expect(data).toEqual("2367")
//     // expect(fetch).toHaveBeenCAlledTimes(1);
//     }
// );

it("handles exception", async () => {
    fetch.mockImplementationOnce(() => Promise.reject("API failure"));

    const data = await getCode("normal");
    expect(data).toEqual(null)
})