import { getCirclesData } from '../process';

test('', () => {
    const data = getCirclesData(8);

    expect(data).toHaveLength(3);
});
