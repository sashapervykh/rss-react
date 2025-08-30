### Performance report

#### Selecting year

|              |                                  Before optimization                                   |                                After optimization |
| :----------- | :------------------------------------------------------------------------------------: | ------------------------------------------------: |
| Commit       |                                         86.3ms                                         |                                                   |
| Render       | _DataLoader_: 0.2ms of 84.7ms; _Table_: 0.6ms of 84.5ms; _TableBody_: 81.6ms of 83.9ms |                                                   |
| Interactions |                   Press 'Apply button' with year input value = 2000                    | Press 'Apply button' with year input value = 2000 |
| Flame Graph  |                                 ![alt text](image.png)                                 |                                                   |
| Ranked Chart |                                ![alt text](image-1.png)                                |                                                   |

#### Searching country

|              |                                  Before optimization                                   |                                     After optimization |
| :----------- | :------------------------------------------------------------------------------------: | -----------------------------------------------------: |
| Commit       |                                         65.2ms                                         |                                                        |
| Render       | _DataLoader_: 0.1ms of 64.4ms; _Table_: 0.5ms of 64.4ms; _TableBody_: 61.2ms of 63.9ms |                                                  $3.00 |
| Interactions |                 Press 'Apply button' with year input value = 'Bahrain'                 | Press 'Apply button' with year input value = 'Bahrain' |
| Flame Graph  |                                ![alt text](image-2.png)                                |                                                        |
| Ranked Chart |                                ![alt text](image-3.png)                                |                                                        |

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
