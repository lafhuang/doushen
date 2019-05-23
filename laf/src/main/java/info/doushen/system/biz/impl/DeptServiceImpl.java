package info.doushen.system.biz.impl;

import info.doushen.common.utils.TreeUtils;
import info.doushen.system.biz.DeptService;
import info.doushen.system.entity.DeptEntity;
import info.doushen.system.mapper.DeptMapper;
import info.doushen.system.utils.Tree;
import org.apache.commons.collections.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * DeptServiceImpl
 *
 * @author huangdou
 * @date 2018/12/5
 */
@Service
public class DeptServiceImpl implements DeptService {

    @Autowired
    private DeptMapper deptMapper;

    @Override
    public List<DeptEntity> list(Map<String, Object> params) {
        return deptMapper.list(params);
    }

    @Override
    public List<Tree<DeptEntity>> getDeptTree() {
        List<DeptEntity> depts = deptMapper.list(new HashMap<>());
        List<Tree<DeptEntity>> deptList = new ArrayList<>();
        if (CollectionUtils.isNotEmpty(depts)) {
            for (DeptEntity deptEntity : depts) {
                Tree<DeptEntity> tree = new Tree<>();
                tree.setId(String.valueOf(deptEntity.getId()));
                tree.setParentId(String.valueOf(deptEntity.getParentId()));
                //TODO
                // tree.setText(deptEntity.getId());
                deptList.add(tree);
            }
        }
        List<Tree<DeptEntity>> tree = TreeUtils.buildList(deptList, "0");
        return tree;

    }

    @Override
    public DeptEntity get(int id) {
        return deptMapper.get(id);
    }

    @Override
    public int save(DeptEntity dept) {
        return deptMapper.save(dept);
    }

    @Override
    public int update(DeptEntity dept) {
        return deptMapper.update(dept);
    }

    @Override
    public int remove(int id) {
        return deptMapper.delete(id);
    }

}
