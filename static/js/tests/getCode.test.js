var getCode = require('../getCode'); 

global.fetch = jest.fn(() => 
Promise.resolve({
    text: () => Promise.resolve('1234')
}));

beforeEach(() => {
    fetch.mockClear();
})

it("gets easy code from api", async () => {
    const result = await getCode("easy");
    expect(typeof result).toEqual('string')
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('https://www.random.org/integers/?num=4&min=0&max=4&col=1&base=10&format=plain&rnd=new', {})
})

it("gets normal code from api", async () => {
    const result = await getCode("normal");
    expect(typeof result).toEqual('string')
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('https://www.random.org/integers/?num=4&min=0&max=7&col=1&base=10&format=plain&rnd=new', {})
})

it("gets hard code from api", async () => {
    const result = await getCode("hard");
    expect(typeof result).toEqual('string')
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('https://www.random.org/integers/?num=4&min=0&max=9&col=1&base=10&format=plain&rnd=new', {})
})

it('handles exception with null', async () => {
    fetch.mockImplementationOnce(() => Promise.reject("API failure"));
    const code = await getCode("easy");
    expect(code).toEqual(null);
    expect(fetch).toHaveBeenCalledWith('https://www.random.org/integers/?num=4&min=0&max=4&col=1&base=10&format=plain&rnd=new', {})
})

it('handles exception of wrong level parameter with null', async () => {
    fetch.mockImplementationOnce(() => Promise.reject("API failure"));
    const code = await getCode("medium");
    expect(code).toEqual(null);
    expect(fetch).toHaveBeenCalledWith('https://www.random.org/integers/?num=4&min=0&max=undefined&col=1&base=10&format=plain&rnd=new', {})
})
