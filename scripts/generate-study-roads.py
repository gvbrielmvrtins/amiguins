from pathlib import Path
import re, math, heapq, json
from functools import lru_cache
# Exclusion envelopes reserve 40 units for the 64-unit street plus outline and bends.
obstacles=[]
curves=[]
def box(x,y,w,h): obstacles.append((x-40,y-40,x+w+40,y+h+40))
for x,y,w,h in [(105,105,350,305),(105,525,350,345),(555,105,370,305),(555,525,370,345), (85,-290,820,280),(-315,120,300,730),(-315,-310,295,345), (1290,-170,530,320),(-130,1190,75,490),(1410,1340,125,280),(2820,490,160,480),(1120,-160,200,180),(1940,-140,360,270),(1050,2190,370,115),(1535,140,330,240),(1970,825,200,230)]: box(x,y,w,h)
rows=re.findall(r"id: '([^']+)'.*?x: (\d+), y: (\d+), width: (\d+)",Path('lib/modular-map.ts').read_text(encoding='utf-8'))
index=0
for name,x,y,w in rows:
 if name in ['vagao-feminino','cineminha','livrinhoteca','mercado-vagas','paises-africanos','linkedin','silicin-valley']: continue
 inset=int(w)*.75*math.tan(math.pi/6)/1.2
 cx,cy=int(x)-inset,int(y)-inset
 if name in ['pracinha','plaza-hispanica']:
  r=210 if name=='pracinha' else 185
  curves.append((cx,cy,r+40,r+40,0))
 elif index%3==0: curves.append((cx,cy,230,215,0))
 elif index%3==1: curves.append((cx,cy,252,242,0))
 else: curves.append((cx,cy,220,215,130))
 index+=1
# Exact distance to the centreline of the shared capsule.
def technology(x,y):
 dx,dy=319,299;t=max(0,min(1,((x-2256)*dx+(y-646)*dy)/(dx*dx+dy*dy)))
 return math.hypot(x-2256-t*dx,y-646-t*dy)<222
# Sample the actual coast; route centre must leave room for the road and shore.
coast_d=re.search(r"const mainland = '([^']+)'",Path('components/modular-map.tsx').read_text(encoding='utf-8'))[1]
tokens=re.findall(r'[MLQCSZ]|-?\d+(?:\.\d+)?',coast_d)
coast=[];i=0;p0=(0,0);control=None
while i<len(tokens):
 cmd=tokens[i];i+=1
 if cmd=='Z':break
 count={'M':2,'L':2,'Q':4,'C':6,'S':4}[cmd]
 vals=list(map(float,tokens[i:i+count]));i+=count
 pts=list(zip(vals[::2],vals[1::2]))
 if cmd in ['M','L']:p0=pts[-1];coast.append(p0);control=None;continue
 if cmd=='S':pts.insert(0,(2*p0[0]-control[0],2*p0[1]-control[1]))
 for k in range(1,25):
  t=k/24;u=1-t
  if cmd=='Q':q=tuple(u*u*p0[j]+2*u*t*pts[0][j]+t*t*pts[1][j] for j in [0,1])
  else:q=tuple(u**3*p0[j]+3*u*u*t*pts[0][j]+3*u*t*t*pts[1][j]+t**3*pts[2][j] for j in [0,1])
  coast.append(q)
 control=pts[-2];p0=pts[-1]
def shore_clear(x,y):
 inside=False
 for a,b in zip(coast,coast[1:]+coast[:1]):
  if (a[1]>y)!=(b[1]>y) and x<(b[0]-a[0])*(y-a[1])/(b[1]-a[1])+a[0]:inside=not inside
  dx=b[0]-a[0];dy=b[1]-a[1];den=dx*dx+dy*dy
  t=max(0,min(1,((x-a[0])*dx+(y-a[1])*dy)/den)) if den else 0
  if (x-a[0]-t*dx)**2+(y-a[1]-t*dy)**2<70**2:return False
 return inside
@lru_cache(maxsize=200000)
def free(n):
 x,y=n
 if not (-140<=x<=2990 and -240<=y<=2240): return False
 if x>2070 and y>1190: return False
 if not shore_clear(x,y):return False
 if technology(x,y): return False
 for cx,cy,rx,ry,r in curves:
  if r:
   qx=max(abs(x-cx)-(rx-r),0);qy=max(abs(y-cy)-(ry-r),0)
   if qx*qx+qy*qy<=r*r:return False
  elif ((x-cx)/rx)**2+((y-cy)/ry)**2<=1:return False
 return not any(a<=x<=c and b<=y<=d for a,b,c,d in obstacles)
nodes=[(x,y) for x in range(-140,2990,20) for y in range(-240,2241,20) if free((x,y))]
# Only use the connected mainland network, excluding isolated residual gaps.
remaining=set(nodes); components=[]
while remaining:
 seed=remaining.pop(); component={seed}; stack=[seed]
 while stack:
  x,y=stack.pop()
  for n in [(x+20,y),(x-20,y),(x,y+20),(x,y-20)]:
   if n in remaining: remaining.remove(n);component.add(n);stack.append(n)
 components.append(component)
main_component=max(components,key=len)
nodes=sorted(main_component)
def snap(p): return min(nodes,key=lambda n:(n[0]-p[0])**2+(n[1]-p[1])**2)
used=set()
edges=set()
def route(a,b,prefer_new=False):
 q=[(0,0,a)]; dist={a:0}; prev={}
 while q:
  _,cost,p=heapq.heappop(q)
  if cost!=dist[p]:continue
  if p==b:
   out=[p]
   while p!=a:p=prev[p];out.append(p)
   used.update(out)
   edges.update(tuple(sorted((u,v))) for u,v in zip(out,out[1:]))
   return out[::-1]
  for dx,dy in [(20,0),(-20,0),(0,20),(0,-20)]:
   n=(p[0]+dx,p[1]+dy)
   step=(24 if n in used else 20) if prefer_new else (12 if n in used else 20)
   if free(n) and cost+step<dist.get(n,1e9):
    dist[n]=cost+step;prev[n]=p;heapq.heappush(q,(cost+step+.6*(abs(n[0]-b[0])+abs(n[1]-b[1])),cost+step,n))
 raise RuntimeError((a,b))
def path(points,prefer_new=False):
 full=[]
 for a,b in zip(points,points[1:]):full+=route(snap(a),snap(b),prefer_new)[:-1]
 full.append(snap(points[-1]))
 return format_path(full)
def format_path(full):
 def visible(a,b):
  count=max(1,int(math.dist(a,b)/4))
  return all(free((a[0]+(b[0]-a[0])*i/count,a[1]+(b[1]-a[1])*i/count)) for i in range(count+1))
 simple=[full[0]];i=0
 while i<len(full)-1:
  j=i+1
  while j+1<len(full) and visible(full[i],full[j+1]):j+=1
  simple.append(full[j]);i=j
 # Round corners as far as the available clearance allows. This avoids
 # square-looking turns without letting a curve intrude into a lot or reserve.
 d=f'M{simple[0][0]} {simple[0][1]}'
 for i,b in enumerate(simple[1:-1],1):
  a,c=simple[i-1],simple[i+1]
  l1=math.dist(a,b); l2=math.dist(b,c);r=min(145,l1*.45,l2*.45)
  def rounded_points(radius):
   before=tuple(b[k]+(a[k]-b[k])*radius/l1 for k in [0,1])
   after=tuple(b[k]+(c[k]-b[k])*radius/l2 for k in [0,1])
   points=[]
   for step in range(13):
    t=step/12;u=1-t
    points.append(tuple(u*u*before[k]+2*u*t*b[k]+t*t*after[k] for k in [0,1]))
   return before,after,points
  before,after,curve=rounded_points(r)
  while r>8 and not all(free((round(x,2),round(y,2))) for x,y in curve):
   r*=.7
   before,after,curve=rounded_points(r)
  d+=f'L{before[0]:g} {before[1]:g}Q{b[0]} {b[1]} {after[0]:g} {after[1]:g}'
 d+=f'L{simple[-1][0]} {simple[-1][1]}'
 return d
loops=[
 ('principal',[(980,580),(1450,540),(1900,580),(1960,1180),(1980,1840),(1450,1820),(930,2180),(500,2100),(60,1800),(60,920),(505,920),(980,580)]),
 ('bloco-rosa',[(980,580),(980,60),(60,60),(60,460),(60,920),(505,920),(505,460),(980,460),(980,580)]),
 ('rosa-transversal',[(60,460),(505,460),(505,60),(980,60)]),
 ('leste',[(1900,580),(2370,300),(2850,260),(2790,1140),(1960,1180),(1900,580)]),
 ('centro',[(980,580),(980,920),(1270,1220),(1370,1500),(1450,1820)]),
 ('sudoeste',[(60,920),(520,940),(530,1380),(780,1460),(1370,1500)]),
 ('sul',[(530,1380),(100,1370),(100,1790),(450,2020),(930,2180),(1450,2060),(1370,1500)]),
 ('prefeitura',[(980,580),(980,60),(1440,60),(1440,540),(980,580)]),
 ('criativos',[(520,940),(970,940),(970,1150),(1270,1220),(1370,1500)]),
]
for name,pts in loops: path(pts)
# Keep the short east-side road instead of dropping it as an isolated island.
# It sits 28 units from the technology approach, so the 64-unit road strokes
# meet cleanly without entering the shared lot.
tech_component=min((c for c in components if c is not main_component),
                   key=lambda c:min((x-2790)**2+(y-1140)**2 for x,y in c))
def snap_to(component,p): return min(component,key=lambda n:(n[0]-p[0])**2+(n[1]-p[1])**2)
tech_road_end=snap_to(tech_component,(2790,1140))
tech_join=snap_to(tech_component,(2500,1160))
route(tech_road_end,tech_join)
main_join=snap_to(main_component,(2500,1160))
bridge=tuple(sorted((main_join,tech_join)))
edges.add(bridge)
used.update(bridge)
# Extend the southwest street end directly to the road east of the Oficina.
path([(780,1660),(1940,1760)],prefer_new=True)
adj={}
for a,b in edges:adj.setdefault(a,set()).add(b);adj.setdefault(b,set()).add(a)
# Remove only short residual spurs, never complete access streets.
for start in list(adj):
 if len(adj[start])!=1:continue
 chain=[start];prev=None;n=start
 while len(adj[n])<=2:
  nxt=[v for v in adj[n] if v!=prev]
  if not nxt:break
  prev,n=n,nxt[0];chain.append(n)
  if len(adj[n])!=2:break
 if sum(math.dist(a,b) for a,b in zip(chain,chain[1:]))<=140:
  for a,b in zip(chain,chain[1:]):adj[a].discard(b);adj[b].discard(a)
remaining={tuple(sorted((a,b))) for a,vs in adj.items() for b in vs}
result=[]
while remaining:
 # Start at a junction so a single continuous curve is never split mid-bend.
 starts=sorted(n for n,vs in adj.items() if len(vs)!=2 and any(tuple(sorted((n,v))) in remaining for v in vs))
 start=starts[0] if starts else min(remaining)[0];n=start;chain=[n]
 while True:
  candidates=sorted(v for v in adj[n] if tuple(sorted((n,v))) in remaining)
  if not candidates:break
  v=candidates[0];remaining.remove(tuple(sorted((n,v))));chain.append(v);n=v
  if n==start or len(adj[n])!=2:break
 if len(chain)>1:result.append({'id':f'connection-{len(result)+1}','d':format_path(chain)})
# Circular plaza: a true arc follows its circular lot rather than a polygonal detour.
for road in result:
 if road['d'].startswith('M1560 820') and road['d'].endswith('1940 1220'):
  cx=1850-320*.75*math.tan(math.pi/6)/1.2
  cy=1190-320*.75*math.tan(math.pi/6)/1.2
  r=235
  sx,sy=cx+r*math.cos(math.radians(-145)),cy+r*math.sin(math.radians(-145))
  ex,ey=cx+r*math.cos(math.radians(36)),cy+r*math.sin(math.radians(36))
  road['d']=f'M1560 820Q1500 870 {sx:g} {sy:g}A235 235 0 0 0 {ex:g} {ey:g}L1940 1220'
# Identical edges from tiny grid loops must be painted only once.
result=list({road['d']:road for road in result}.values())
Path('lib/map-study-roads.ts').write_text('// Generated by scripts/generate-study-roads.py. Logical ground coordinates.\nexport const studyRoads = '+json.dumps(result,indent=2)+' as const;\n',encoding='utf-8')
print(f'{len(result)} connected routes generated with obstacle clearance.')

