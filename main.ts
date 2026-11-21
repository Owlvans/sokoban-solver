import{readdirSync as R,readFileSync as F,mkdirSync as M,writeFileSync as W}from'node:fs'
import{join as J}from'node:path'
let E=process.env,I=E.MAKEFUN_INPUT_DIR||'/input',O=E.MAKEFUN_OUTPUT_DIR||'/output',D=[],C='urdl'
let fl=(s,b,r)=>{let p=new Map([[s,-1]]),q=[s];while(q.length){let c=q.pop();for(let k=0;k<4;k++){let n=c+D[k];if(r.has(n)&&!b.has(n)&&!p.has(n))p.set(n,c),q.push(n)}}return p}
let wp=(p,s,t)=>{let o='';for(let c=t;c!=s;c=p.get(c))o=C[D.indexOf(c-p.get(c))]+o;return o}
let solve=t=>{
let w=t.indexOf('\n'),N=0,gol=new Set,floor=new Set,box=[],pl=0
D=[-w,1,w,-1]
for(let j=0;j<t.length;j++){let c=t[j];if(c=='\n')continue;let i=N++
if(c!='#'){floor.add(i);if('.*+'.includes(c))gol.add(i);if('$*'.includes(c))box.push(i);if('@+'.includes(c))pl=i}}
let hr=(pl/w)|0,rest=new Set([...floor].filter(i=>(i/w|0)!=hr)),un=new Set(rest),rooms=[]
while(un.size){let p=fl(un.values().next().value,new Set,rest);p.forEach((_,k)=>un.delete(k));let bs=box.filter(b=>p.has(b));if(bs.length){let e=-1;for(let x=0;x<w;x++){let n=hr*w+x;if(p.has(n-w)||p.has(n+w))e=n}rooms.push([new Set(p.keys()),bs,e])}}
let rs=(inter,bs,e)=>{
let reg=new Set(inter);reg.add(e)
let gl=new Set([...inter].filter(i=>gol.has(i)))
let dead=i=>!gl.has(i)&&(!reg.has(i-w)||!reg.has(i+w))&&(!reg.has(i-1)||!reg.has(i+1))
let f0=fl(e,new Set(bs),reg),nodes=[[bs,e,'',f0]],seen=new Set([bs.join()+','+Math.min(...f0.keys())])
for(let hi=0;hi<nodes.length;hi++){let[b,p,mv,f]=nodes[hi],b2=new Set(b)
for(let x of b)for(let k=0;k<4;k++){let st=x-D[k],ds=x+D[k]
if(f.has(st)&&inter.has(ds)&&!b2.has(ds)&&!dead(ds)){
let nb=b.map(y=>y==x?ds:y).sort((a,b)=>a-b),f2=fl(x,new Set(nb),reg),ky=nb.join()+','+Math.min(...f2.keys())
if(!seen.has(ky)){seen.add(ky);let nm=mv+wp(f,p,st)+C[k]
if(nb.every(y=>gl.has(y))&&f2.has(e))return[nm,x,nb]
nodes.push([nb,x,nm,f2])}}}}
return null}
let out='',cur=pl,now=new Set(box)
for(let[inter,bs,e]of rooms){let f=fl(cur,now,floor);if(!f.has(e))return''
let s=rs(inter,bs,e);if(!s)return''
out+=wp(f,cur,e)+s[0];cur=s[1];for(let b of bs)now.delete(b);for(let b of s[2])now.add(b)}
return out}
for(let d of R(I)){M(J(O,d),{recursive:!0});W(J(O,d,'solution.txt'),solve(F(J(I,d,'level.txt'),'utf8'))+'\n')}
