%
(1001)
(T2  D=0.125 CR=0. - ZMIN=-0.05 - flat end mill)
G90 G54 G64 G50 G17 G40 G80 G94 G91.1 G49
G20 (Inch)
G30

N10(18Test)
T2 G43 H2 M6
S5000 M3 M8
G54
G0 X0.0375 Y0.4001
G0 Z0.6
G0 Z0.2
G1 Z0.0394 F10.
G1 Z-0.0375
G1 Y0.3998 Z-0.0403
G1 Y0.3989 Z-0.0429
G1 Y0.3974 Z-0.0453
G1 Y0.3954 Z-0.0473
G1 Y0.393 Z-0.0488
G1 Y0.3904 Z-0.0497
G1 Y0.3876 Z-0.05
G1 Y0.3751 F20.
G3 X0.05 Y0.3626 I0.0125 J0.
G1 X0.7496
G2 X0.8121 Y0.3001 I0. J-0.0625
G1 Y0.05
G2 X0.7496 Y-0.0125 I-0.0625 J0.
G1 X0.05
G2 X-0.0125 Y0.05 I0. J0.0625
G1 Y0.3001
G2 X0.05 Y0.3626 I0.0625 J0.
G3 X0.0625 Y0.3751 I0. J0.0125
G1 Y0.3876
G1 Y0.3904 Z-0.0497
G1 Y0.393 Z-0.0488
G1 Y0.3954 Z-0.0473
G1 Y0.3974 Z-0.0453
G1 Y0.3989 Z-0.0429
G1 Y0.3998 Z-0.0403
G1 Y0.4001 Z-0.0375
G0 Z0.6
M5 M9

G30
M30
%
