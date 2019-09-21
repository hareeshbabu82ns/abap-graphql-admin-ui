## API testing using PyTest 
* using tavern api test framework

### execute single file
```bash
$> conda activate <env>
$> AUTH=<token> PYTHONPATH=$PYTHONPATH:apitest pytest apitest/test_login.tavern.yaml
```

### execute all tests
```bash
$> conda activate <env>
$> AUTH=<token> PYTHONPATH=$PYTHONPATH:apitest pytest apitest
```