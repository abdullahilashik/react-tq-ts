// makes something wait
export const delay = async(n : number) => new Promise(resolve => setTimeout(resolve, n*1000));