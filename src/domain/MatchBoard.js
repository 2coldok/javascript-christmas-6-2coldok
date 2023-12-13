
class MatchBoard {
  frontendMap = new Map();
  backendMap = new Map();
  
  // data : [course, level, mission]
  // pairCrews : [[a, b], [c, d] ...]
  record(data, pairCrews) {
    const [course, level, mission] = data;

    if (course === 'frontend') {
      this.frontendRecord(level, mission, pairCrews);
    }
    
    if (course === 'backend') {
      this.backendRecord(level, mission, pairCrews);
    }
  }

  frontendRecord(level, mission, pairCrews) {
    this.frontendMap.set([level, mission], pairCrews)
  }

  backendRecord() {
    this.backendMap.set([level, mission], pairCrews)
  }



}

export default MatchBoard;
