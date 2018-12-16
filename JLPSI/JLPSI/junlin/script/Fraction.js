/*
 *分数计算方法
 * 
 * */

class Fraction {
	//let fenzi, fenmu;
	/*构造器*/
	constructor(a, b) {
		this.fenzi = a;
		this.fenmu = b;
	}
	toDouble() {
		return this.fenzi * 1.0 / this.fenmu;
	}
	/*加*/
	plus(fraction) {
		let m = new Fraction(0, 1);
		m.fenmu = fraction.fenmu * this.fenmu;
		m.fenzi = this.fenzi * fraction.fenmu + this.fenmu * fraction.fenzi;
		return m;
	}
	/*乘*/
	multiply(fraction){
		let m = new Fraction(0, 1);
		m.fenmu = fraction.fenmu * this.fenmu;
		m.fenzi = this.fenzi * fraction.fenzi;
		return m;
	}
	printFraction(){
		let r, x = this.fenmu, y = this.fenzi;
		while (y != 0) {
			r = x % y;
			x = y;
			y = r;
		}
		this.fenzi /= x;
		this.fenmu /= x;
		if (this.fenzi % this.fenmu != 0){
			console.log(this.fenzi + "/" + this.fenmu);
			return this.fenzi + "/" + this.fenmu;
		}
			
		else {
			let a = this.fenzi / this.fenmu;
			console.log(a);
			return a;
		}
	}
	
}

/*let m = new Fraction(0, 1);
m.printFraction();*/
