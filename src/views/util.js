// a + bx = y ;根据两点求a,b
export const getLineAB = (p1, p2) => {
    // 斜率
    const b = (p1.y - p2.y) / (p1.x - p2.x);
    // 常数项
    const a = p1.y - b * p1.x;
    return { a, b };
  };

  // 计算点到线的距离
//  a + bx = y ;根据两点求a,b
export const getPointToLineDistance = (p, a, b) => {
    const x1 = (p.y - a) / b;
    const len = p.x - x1;
    const sin = b / Math.sqrt(b ** 2 + 1);
    const distance = Math.abs(len * sin);
    return distance;
};

export class Bounds  {

    constructor( x = 0,  y = 0,  width = 0,  height = 0,  absX = 0,  absY = 0) {

    }
}

  /**
   * 创建线段的长方形，宽10px
   * @param p1
   * @param p2
   * @returns
   */
  export function createSegmentBounds(p1, p2, width = 10) {
    if (p1.y === p2.y) { // 横线
      let leftPt;
      let rightPt;
      if (p1.x < p2.x) {
        leftPt = p1;
        rightPt = p2;
      } else {
        leftPt = p2;
        rightPt = p1;
      }
      const bounds = new Bounds(leftPt.x, leftPt.y - width / 2, rightPt.x - leftPt.x, width);
      bounds.absX = bounds.x;
      bounds.absY = bounds.y;
      return bounds;
    } else if (p1.x === p2.x) { // 竖线
      let topPt;
      let bottomPt;
      if (p1.y < p2.y) {
        topPt = p1;
        bottomPt = p2;
      } else {
        topPt = p2;
        bottomPt = p1;
      }
      // const leftPt = p1.x<p2.x?
      const bounds = new Bounds(topPt.x - width / 2, topPt.y, width, bottomPt.y - topPt.y);
      bounds.absX = bounds.x;
      bounds.absY = bounds.y;
      return bounds;
    } else {
      return ;
    }

  }

  export const isPointInBounds = (point, bounds, includesBounds) => {
    if (includesBounds) {
      return point.x >= bounds.absX && point.x <= bounds.absX + bounds.width && point.y >= bounds.absY && point.y <= bounds.absY + bounds.height;
    }
    return point.x > bounds.absX && point.x < bounds.absX + bounds.width && point.y > bounds.absY && point.y < bounds.absY + bounds.height;
  };