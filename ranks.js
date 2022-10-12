let nodes = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K']

const block = (i, j) => {
    const b = [B(i, j)];
    const end = B(i, j+1) -1;
    if (end == Infinity) {
        return b;
    } else {
        return [...b, end]
    }
}

const B = (i, j) => {
    if (i < 0 || j < 0) {
        throw new Error("Neither i nor j can be less than 0.");
    }
    if (i == 0) {
        return j;
    }
    else if (j == 0) {
        return 0;
    }
    else if (j == 1) {
        return B(i - 1, 2);
    }
    else if (i == 1) {
        return Math.pow(2, j);
    }
    else {
        try {
            return B(i -1, B(i, j -1));
        } catch (e) {
            return Infinity;
        }
    }
}

const B2 = (i, j) => {
    if (i < 0 || j < 0) {
        throw new Error("Neither i nor j can be less than 0.");
    }
    if (i == 0) {
        return j;
    }
    else if (j == 0) {
        return 0;
    }
    else if (i == 1) {
        return Math.pow(2, j);
    }
    else {
        try {
            return Math.pow(2, B2(i -1, j))
        } catch (e) {
            return Infinity;
        }
    }
}

const block2 = (i, j) => {
    const b = [B2(i, j)];
    const end = B2(i, j+1) -1;
    if (end == Infinity) {
        return b;
    } else {
        return [...b, end]
    }
}

const findLevel = (r, pr) => {
    let i = 1;
    let j = 0;
    let result = [];
    while(true) {
        result = block(i, j++);
        if (result[0] == Infinity) {
            throw new Error("Not found");
        }
        if (r >= result[0] && pr <= result[1]) {
            return `Common in block(${i}, ${j}): [${result[0]}..${result[1]}].`;
            
        }
        if (r < result[0]) {
            i ++;
            j = 0;
        }
    }
}

console.log(nodes.map((n, index) => {
    return `${n}: ${findLevel(index, index + 1)}`
}))
