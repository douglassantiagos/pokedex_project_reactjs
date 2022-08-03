export function typeColors(type) {  
    let primary = '';

    if (type[0] === 'normal') {
        primary = 'orange.400'
    } else if (type[0] === 'fighting') {
        primary = 'orange.200'
    } else if (type[0] === 'flying') {
        primary = 'red.200'    
    } else if (type[0] === 'poison') {
        primary = 'purple.400'
    } else if (type[0] === 'ground') {
        primary = 'yellow.500'
    } else if (type[0] === 'rock') {
        primary = 'gray.400'
    } else if (type[0] === 'bug') {
        primary = 'green.300'
    } else if (type[0] === 'ghost') {
        primary = 'purple.300'
    } else if (type[0] === 'steel') {
        primary = 'gray.300'
    } else if (type[0] === 'fire') {
        primary = 'red.400'
    } else if (type[0] === 'water') {
        primary = 'blue.400'
    } else if (type[0] === 'grass') {
        primary = 'green.400'
    } else if (type[0] === 'electric') {
        primary = 'yellow.400'
    } else if (type[0] === 'psychic') {
        primary = 'purple.200'
    } else if (type[0] === 'ice') {
        primary = 'cyan.300'
    } else if (type[0] === 'dragon') {
        primary = 'orange'
    } else if (type[0] === 'dark') {
        primary = 'blue.600'
    } else if (type[0] === 'fairy') {
        primary = 'pink.300'
    }

    const colors = {
        primary,
    }

    return colors;
}