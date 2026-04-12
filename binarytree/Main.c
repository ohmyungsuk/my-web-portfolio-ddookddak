#include <stdio.h>
#include <stdlib.h>

// 이진 트리의 노드 구조체 정의
struct TreeNode {
    int data;                  // 노드에 저장될 값
    struct TreeNode* left;     // 왼쪽 자식 노드
    struct TreeNode* right;    // 오른쪽 자식 노드
};

// 전위 순회 함수
// 순서: 루트 -> 왼쪽 -> 오른쪽
void preorderTraversal(struct TreeNode* root) {
    if (root != NULL) {
        printf("%d ", root->data);          // 현재 노드 출력
        preorderTraversal(root->left);      // 왼쪽 서브트리 순회
        preorderTraversal(root->right);     // 오른쪽 서브트리 순회
    }
}

// 중위 순회 함수
// 순서: 왼쪽 -> 루트 -> 오른쪽
void inorderTraversal(struct TreeNode* root) {
    if (root != NULL) {
        inorderTraversal(root->left);       // 왼쪽 서브트리 순회
        printf("%d ", root->data);          // 현재 노드 출력
        inorderTraversal(root->right);      // 오른쪽 서브트리 순회
    }
}

// 후위 순회 함수
// 순서: 왼쪽 -> 오른쪽 -> 루트
void postorderTraversal(struct TreeNode* root) {
    if (root != NULL) {
        postorderTraversal(root->left);     // 왼쪽 서브트리 순회
        postorderTraversal(root->right);    // 오른쪽 서브트리 순회
        printf("%d ", root->data);          // 현재 노드 출력
    }
}

// 새로운 노드를 생성하는 함수
struct TreeNode* createNode(int data) {
    struct TreeNode* newNode = (struct TreeNode*)malloc(sizeof(struct TreeNode));

    // 메모리 할당 실패 검사
    if (newNode == NULL) {
        printf("메모리 할당 오류\n");
        exit(1);
    }

    newNode->data = data;
    newNode->left = NULL;
    newNode->right = NULL;

    return newNode;
}

int main() {
    // 문제에서 제시된 이진 트리 생성
    struct TreeNode* root = createNode(1);
    root->left = createNode(2);
    root->right = createNode(3);
    root->left->left = createNode(4);
    root->left->right = createNode(5);
    root->right->left = createNode(6);
    root->right->right = createNode(7);

    // 전위 순회 결과 출력
    printf("전위 순회 결과: ");
    preorderTraversal(root);
    printf("\n");

    // 중위 순회 결과 출력
    printf("중위 순회 결과: ");
    inorderTraversal(root);
    printf("\n");

    // 후위 순회 결과 출력
    printf("후위 순회 결과: ");
    postorderTraversal(root);
    printf("\n");

    return 0;
}