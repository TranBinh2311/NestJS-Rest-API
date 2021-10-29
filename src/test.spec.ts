import exp from "constants";

test('test is null', ()=>{
    const n = null;

    expect(n).toBeNull();
})


test('2+2', ()=>{
    const result = 2+2;
    expect(result).toEqual(4)
})