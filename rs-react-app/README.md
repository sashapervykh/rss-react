#### Performance report

#### Selecting year

|              |                                Before optimization                                |                                After optimization |
| :----------- | :-------------------------------------------------------------------------------: | ------------------------------------------------: |
| Commit       |                                      86.3ms                                       |                                                   |
| Render       | +DataLoader: 0.2ms of 84.7ms +Table: 0.6ms of 84.5ms +TableBody: 81.6ms of 83.9ms |                                                   |
| Interactions |                 Press 'Apply button' with year input value = 2000                 | Press 'Apply button' with year input value = 2000 |
| Flame Graph  |                              ![alt text](image.png)                               |                                                   |
| Ranked Chart |                             ![alt text](image-1.png)                              |                                                   |

#### Searching country

|              | Before optimization | After optimization |
| :----------- | :-----------------: | -----------------: |
| Commit       |         10          |              $2.50 |
| Render       |          5          |              $3.00 |
| Interactions |         12          |              $1.75 |
| Flame Graph  |         12          |              $1.75 |
| Ranked Chart |         12          |              $1.75 |

#### Sorting population

|              | Before optimization | After optimization |
| :----------- | :-----------------: | -----------------: |
| Commit       |         10          |              $2.50 |
| Render       |          5          |              $3.00 |
| Interactions |         12          |              $1.75 |
| Flame Graph  |         12          |              $1.75 |
| Ranked Chart |         12          |              $1.75 |

#### Adding column

|              | Before optimization | After optimization |
| :----------- | :-----------------: | -----------------: |
| Commit       |         10          |              $2.50 |
| Render       |          5          |              $3.00 |
| Interactions |         12          |              $1.75 |
| Flame Graph  |         12          |              $1.75 |
| Ranked Chart |         12          |              $1.75 |

#### Clearing

|              | Before optimization | After optimization |
| :----------- | :-----------------: | -----------------: |
| Commit       |         10          |              $2.50 |
| Render       |          5          |              $3.00 |
| Interactions |         12          |              $1.75 |
| Flame Graph  |         12          |              $1.75 |
| Ranked Chart |         12          |              $1.75 |
