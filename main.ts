import{readdirSync as R,readFileSync as F,mkdirSync as M,writeFileSync as W}from'node:fs'
let E=process.env,I=E.MAKEFUN_INPUT_DIR||'/input',O=E.MAKEFUN_OUTPUT_DIR||'/output',D,C='urdl'
let fl=(s,A,X,p=new Map([[s,-1]]))=>{for(let k=0;k<4;k++){let n=s+D[k];if(A.has(n)&&!X.has(n)&&!p.has(n))p.set(n,s),fl(n,A,X,p)}return p}
let wp=(p,s,t)=>{let o='';for(let c=t;c!=s;c=p.get(c))o=C[D.indexOf(c-p.get(c))]+o;return o}
let S=t=>{
let w=t.indexOf('\n'),N=0,G=new Set,H=new Set,B=[],P=0
D=[-w,1,w,-1]
for(let j=0;j<t.length;j++){let c=t[j];if(c=='\n')continue;let i=N++
if(c!='#')H.add(i);if('.*+'.includes(c))G.add(i);if('$*'.includes(c))B.push(i);if('@+'.includes(c))P=i}
let h=(P/w)|0,r=new Set([...H].filter(i=>(i/w|0)!=h)),u=new Set(r),Q=[]
while(u.size){let p=fl(u.values().next().value,r,new Set),s=new Set(p.keys()),b=B.filter(x=>s.has(x))
s.forEach(x=>u.delete(x))
if(b.length){let e=-1
for(let x=0;x<w;x++){let n=h*w+x
if(s.has(n-w)||s.has(n+w))e=n}
Q.push([s,b,e])}}
let rs=(s,b,e)=>{
let A=new Set(s);A.add(e)
let dd=i=>!G.has(i)&&(!A.has(i-w)||!A.has(i+w))&&(!A.has(i-1)||!A.has(i+1))
let f=fl(e,A,new Set(b)),n=[[b,e,'',f]],V=new Set([b.join()+','+Math.min(...f.keys())])
for(let j=0;j<n.length;j++){let[b,p,m,f]=n[j],X=new Set(b)
for(let x of b)for(let k=0;k<4;k++){let y=x-D[k],z=x+D[k]
if(f.has(y)&&s.has(z)&&!X.has(z)&&!dd(z)){
let nb=b.map(v=>v==x?z:v).sort((a,b)=>a-b),f2=fl(x,A,new Set(nb)),K=nb.join()+','+Math.min(...f2.keys())
if(!V.has(K)){V.add(K)
let m2=m+wp(f,p,y)+C[k]
if(nb.every(v=>G.has(v)))return[m2,x,nb]
n.push([nb,x,m2,f2])}}}}
return null}
let o='',p=P,X=new Set(B)
for(let[s,b,e]of Q){let f=fl(p,H,X)
if(!f.has(e))return''
let z=rs(s,b,e)
if(!z)return''
o+=wp(f,p,e)+z[0];p=z[1]
for(let x of b)X.delete(x)
for(let x of z[2])X.add(x)}
return o}
for(let d of R(I)){M(O+'/'+d,{recursive:!0});W(O+'/'+d+'/solution.txt',S(F(I+'/'+d+'/level.txt','utf8'))+'\n')}
